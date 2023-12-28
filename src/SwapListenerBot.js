const ethers = require("ethers");

const pairABI = require("./abi/pair.json");

class SwapListenerBot {
  constructor(rpc, pair) {
    this.provider = new ethers.JsonRpcProvider(rpc);

    this.pairAddress = pair;
    this.pair = new ethers.Contract(pair, pairABI, this.provider);
  }

  onSwap(handler) {
    this.pair.on(
      "Swap",
      (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
        console.log(
          `Swap: ${sender} ${amount0In} ${amount1In} ${amount0Out} ${amount1Out} ${to}`
        );

        handler(
          this.pairAddress,
          sender,
          amount0In,
          amount1In,
          amount0Out,
          amount1Out,
          to
        );
      }
    );
  }
}

module.exports = SwapListenerBot;
