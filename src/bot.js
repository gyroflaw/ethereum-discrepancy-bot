const ethers = require("ethers");

const SwapListenerBot = require("./SwapListenerBot");
const logger = require("./logger");

class DiscrepancyBot {
  constructor(rpc, token0, token1, pairs, discrepancy) {
    this.provider = new ethers.JsonRpcProvider(rpc);

    this.token0 = token0;
    this.token1 = token1;
    this.pairs = pairs;
    this.discrepancy = discrepancy;

    pairs.forEach((p) => {
      const listener = new SwapListenerBot(rpc, p);

      listener.onSwap(this.onSwap.bind(this));
    });
  }

  async onSwap(pair, sender, amount0In, amount1In, amount0Out, amount1Out, to) {
    const price = amount0In / amount1Out;

    // Iterate all others pair price
    const promises = this.pairs
      .filter((p) => p !== pair)
      .map(async (p) => {
        const pair = new ethers.Contract(p, pairABI, this.provider);

        const reserves = await pair.getReserves();

        const pairPrice = reserves[0] / reserves[1];

        console.log(`Pair ${p} price: ${price}`);

        // Check if the swap meets discrepancy
        const discrepancy = (price - pairPrice) / price;
        if (discrepancy > this.discrepancy) {
          console.log(
            `Discrepancy between ${pair} and ${p} is greater than ${
              this.discrepancy * 100
            }%: ${discrepancy}`
          );
          // Log it
          logger.info({
            tokenA: this.token0,
            tokenB: this.token1,
            dexA: pair,
            dexB: p,
            priceA: price,
            priceB: pairPrice,
            amount: discrepancy,
          });
        }
      });

    await Promise.all(promises);
  }
}

module.exports = DiscrepancyBot;
