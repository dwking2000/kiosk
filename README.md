# Kiosk

Kiosk is a protocol for buying and selling products on the Ethereum blockchain.

## Project Overview

The blockchain has the potential to reimagine how we exchange goods and services. Early projects have shown innovative approaches for how buy and trade items in a trustless way. But most rely on application-specific smart contracts that are difficult to upgrade and reuse.

Kiosk provides a framework for creating decentralized marketplaces. Its smart contracts are building blocks that can be swapped in and out and reconfigured for many different markets. It uses the following rules:

* A `Product` has a unique 10-digit identifier, similar to a barcode
* A `Market` has a method called `buy` where buyers can purchase a product based on its identifier
* A `Market` stores `Products` and `Orders`
* A `Product` tells a `Market` its information, price, and availability
* A seller can withdraw proceeds from an `Order` when the `Market` has marked it as `Fulfilled`

Having a standardized approach for building on-chain markets can facilitate trust for buyers and sellers. With Kiosk, a buyer can figure out how much an item costs and how to buy it just by knowing its identifier.

For developers, Kiosk’s protocol can provide a foundation to quickly build and launch new markets with a lower probability of error.

## Quick Start

Get started by testing locally with [TestRPC](https://github.com/ethereumjs/testrpc).

```
$ testrpc
```

Compile and deploy the Solidity contracts using [Truffle](http://truffleframework.com/). This will also register a new Decentralized Identification Number (DIN) for the first testrpc account and add a demo product to the deployed `PublicMarket.sol`.

```
$ truffle compile
$ truffle migrate
```

Finally, start the React project and open http://localhost:3000/ to see the app.

```
$ yarn start
```
## Testing
```
truffle test
```
