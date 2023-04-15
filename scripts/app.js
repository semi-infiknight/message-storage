const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Web3 = require("web3");
const { keccak256 } = require("ethereumjs-util");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const web3 = new Web3(process.env.RPC_URL);

const MessageStorageABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "getMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const messageStorage = new web3.eth.Contract(
  MessageStorageABI,
  process.env.CONTRACT_ADDRESS
);

app.post("/messages", async (req, res) => {
  const message = req.body.message;
  const key = keccak256(message);
  const encodedKey = "0x" + key.toString("hex");
  const accounts = await web3.eth.getAccounts();
  await messageStorage.methods.setMessage(encodedKey, message).send({
    from: accounts[0],
    gas: 100000,
  });
  res.send({ message: "Message stored successfully!" });
});

app.get("/messages/:key", async (req, res) => {
  const key = req.params.key;
  const message = await messageStorage.methods.getMessage(key).call();
  res.send({ message: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
