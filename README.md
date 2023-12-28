Looking for a blockchain dev to write a listener bot, that will monitor the Ethereum blockchain and do the below steps. This needs to be written so that it can run on a Windows PC with uBuntu OS. You will be given AnyDesk access to this PC and all dev needs to be done on this PC directly (not on github).

Details:

0. Install node.js, web.js and/or any components needed for your task on the uBuntu PC.

1. Listen for swap events on multiple DEX's (such as Uniswap, Sushiswap, PancakSwap etc.).

2. When a swap event occurs, compare the buy price of that token (in USDT) on that DEX against the sell price of the same token on all other DEX's.

3. If a price discrepancy exists between any two DEXs of greater than 3% then:

3-A. Call a smart contract on the blockchain (this smart contract already exists so you will NOT need to develop it -- just use a placeholder in your code for the contract address) and send the following parameters to the smart contract: TokenA, TokenB (will always be USDT), DexA, DexB, Amount.

3-B. Log the details to a text file or DB (or whatever method is viable) showing all details, including all fees, gas that may be charged by both DEX's.

Here’s more explanation also:

1. Build in python to run on a uBuntu PC.
2. Use RPC gateway such as Infura or Ankr
3. Listen for swap events on Uniswap (using uniswap V2 router)
4. When swap event occurs, compare buy/sell price of that token pair against same tokens on other DEXs that use AMMs based on Uniswap V2 (such as Pancake, Sushiswap, Kyber, Curve, Balancer etc.)
5. If any price discrepancy is found of greater than 3% then log all of the details to a text file.
