# Ping Contract

My first full-fledged contract written in a Solidity dev environment.

Uses hardhat to compile, run, and deploy the contracts.

Also uses alchemy for deploying to Rinkeby. Haven't deployed to mainnet though!

## What it Does

This contract accepts "Pings" along with a message. Each wallet that "pings" the contract has a 25% chance at winning a small price of 0.001 ETH. But be careful, you can only ping the contract no sooner than every 60 seconds.
