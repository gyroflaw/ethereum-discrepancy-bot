const http = require("http");

const Bot = require("./bot");

http
  .createServer(() => {})
  .listen(3000, () => {
    const bot = new DiscrepancyBot(
      "https://eth-goerli.g.alchemy.com/v2/GP12JiWqNP5jy6AFvB6StJdsWa4aDF57",
      {
        factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
        router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
      "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc"
    );

    bot.start();

    console.log(`Bot is running...`);
  });

process.on("uncaughtException", (err, origin) => {
  console.error(err);
  console.error(`[error] Exception: ${err}`);
  process.exit();
});
