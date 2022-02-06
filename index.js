import * as styles from './index.scss'; 
const SHA256 = require('js-sha256');
const port = 4000; //TODO: bootstrap port 4000 is "well known" peer...
const server = `http://localhost:${port}`;
const axios = require('axios');
const ethers = require('ethers');
require('dotenv').config();

const ALCHEMY_URL = process.env.RINKEBY_URL;

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const key = ec.genKeyPair();
//TODO: longer term, we would do this locally, and interface/wallet generate and store the private key
const publicKey = key.getPublic().encode('hex');
const privateKey = key.getPrivate().toString('hex');
//TODO: we need to announce these keys to the network 

function getLatestBlock(){
  axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [
      "latest", 
      false  // retrieve the full transaction object in transactions array
    ]
  }).then((response) => {
    let blocknum = BigInt(response.data.result.number).toString();
    document.getElementById("blocknum").innerHTML = blocknum;
  });
};

document.getElementById("transfer-amount").addEventListener('click', () => {
  getLatestBlock();
});
