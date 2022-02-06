const express = require('express');
const app = express();
const cors = require('cors');
let port = 4000;
const SHA256 = require('js-sha256');
const axios = require('axios');
const ethers = require('ethers');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-mainnet.alchemyapi.io/v2/d55KVxvYTgHkcjrzn0DMfnUh7Q9Sc6IT";
//const ALCHEMY_URL = "https://eth-rinkeby.alchemyapi.io/v2/_mbjGkZuVjRdK2jOsPjPUS01C8Htm4QL";

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

//pass in the port number
if(process.argv[2])
  port = process.argv[2]

var EC = require('elliptic').ec;
const e = require('express');
var ec = new EC('secp256k1');
// const key = ec.genKeyPair();
// //TODO: longer term, we would do this locally, and interface/wallet generate and store the private key
// const publicKey = key.getPublic().encode('hex');
// const privateKey = key.getPrivate().toString('hex');
// console.log(`PublicKey: ${publicKey}`); 
// console.log(`PrivateKey: ${privateKey}`);

function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}

app.post('/send', (req, res) => {
  const {sender, recipient, amount, rSig, sSig} = req.body;
  //const {sender, recipient, amount} = req.body;

  const bodyLocal = JSON.stringify({
    sender, amount, recipient
  });
});

// GET with parameters
app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  


  res.send({ balance });
});

// GET block number
app.get('/getLatestBlockNum', (req, res) => {
  //const {address} = req.params;
  
  axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [
      "latest", // block 46147
      false  // retrieve the full transaction object in transactions array
    ]
  }).then((response) => {
    let blockNum = BigInt(response.data.result.number).toString();
    res.send( blockNum );
    console.log(response.data.result);
    console.log("Block Number: ", blockNum);
  });
});

app.post('/peerList', (req, res) => {
  console.log('POST /peerList');
  console.log('req.body', req.body);

  res.send("success");
});

app.post('/newPeer', (req, res) => {
  console.log('POST /newPeer');
  console.log('req.body', req.body);

  let peerPort = JSON.stringify(minerPeers);

  console.log('returning peers', peerPort);
  res.send({ peerPort });
});

//if anyone calls this, return current list of blocks
app.get('/blockchainBlocks', (req, res) => {
  res.send(minerCopyOfBlockchain.blocks);
});

//when other miners successfully mine a block, they can 
//broadcast to all thier peers 
app.post('/minedBlock', (req, res) => {
  console.log('POST /minedBlock');
  //console.log('req.body', req.body);
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  // console.log(`Key 1, Public: ${publicKey1} Private: ${privateKey1}`);
});
