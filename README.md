# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Dependencies:

`ethereumjs-tx`: used for creating Ethereum transactions
`ethereumjs-util`: used for encoding and decoding Ethereum addresses and other data types
`web3`: used for interacting with Ethereum nodes
`dotenv`: used for loading environment variables
`express`: used for building a web API
`body-parser`: used for parsing HTTP request bodies
`cors`: used for enabling Cross-Origin Resource Sharing (CORS)


Replace <your Ethereum node's RPC URL> and <your Ethereum account's private key> with the appropriate values in the `.env` file.

The `MesaageStorage` contract defines a mapping from bytes32 keys to string messages, and two functions for setting and getting messages.
The setMessage function takes a bytes32 key and a string message as arguments, and sets the message for that key in the mapping.
The getMessage function takes a bytes32 key as an argument, and returns the message for that key from the mapping.
Note that all messages are stored in their keccak256-encoded form as bytes32 keys.

The `deploy.js` script first creates a new MessageStorage contract instance using the `ethers.getContractFactory` method, and then deploys it to the Ethereum network using the deploy method.
It then constructs and signs a transaction object using the account's private key from the `.env` file, and sends the transaction to the network using the `ethers.provider.sendTransaction` method.
Note that the `ethers.utils.parseUnits("20", "gwei")` method is used to set the gas price for the transaction to 20 Gwei. You may need to adjust this value depending on the network you're deploying to and the current gas prices.

The `app.js` file sets up an Express server that listens for HTTP requests on port 3000 (or the value of the PORT environment variable). It also creates a new instance of the MessageStorage contract using the `web3.eth.Contract` method and the contract ABI and address from the `.env` file.
The /messages endpoint handles POST requests to store a new message. It first computes the keccak256 hash of the message using the ethereumjs-util library, and then encodes the hash as a hex string with the `toString("hex")` method. It then uses the setMessage method of the contract instance to store the message with the encoded key.
The /messages/:key endpoint handles GET requests to retrieve a message by key. It simply calls the getMessage method of the contract instance with the key parameter from the request URL.
Note that this file uses the `dotenv` library to load environment variables from a `.env` file in the root directory of the project.

