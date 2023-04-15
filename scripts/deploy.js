const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MessageStorage = await ethers.getContractFactory("MessageStorage");
  const messageStorage = await MessageStorage.deploy();

  console.log("Contract address:", messageStorage.address);

  const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");
  const tx = {
    to: messageStorage.address,
    value: 0,
    gasPrice: ethers.utils.parseUnits("20", "gwei"),
    gasLimit: 1000000,
    nonce: await deployer.getTransactionCount(),
  };
  const signedTx = await deployer.signTransaction(tx, privateKey);
  const txHash = await ethers.provider.sendTransaction(signedTx);

  console.log("Transaction hash:", txHash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
