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
      true  // retrieve the full transaction object in transactions array
    ]
  }).then((response) => {
    let blocknum = BigInt(response.data.result.number).toString();
    let transactions = response.data.result.transactions;

    //let data = JSON.stringify(transactions);
    console.table(transactions);
   
    // (C) GENERATE TABLE
    // (C1) CREATE EMPTY TABLE
    var table = document.createElement("table"), row, cellA, cellB;
    for (let i=0; i<transactions.length; i++){
      // (C2) ROWS & CELLS
      row = table.insertRow();
      cellA = row.insertCell();
      cellB = row.insertCell();
   
      // (C3) KEY & VALUE
      cellA.innerHTML = "From: ";
      cellB.innerHTML = transactions[i].from;
    }
    
    //append the compiled table to the DOM
    let removeOldData = document.getElementById("transactionTable").lastChild;
    if(removeOldData)
      document.getElementById("transactionTable").removeChild(removeOldData);
    document.getElementById("transactionTable").appendChild(table);
    document.getElementById("blocknum").innerHTML = blocknum;
  });
};

document.getElementById("transfer-amount").addEventListener('click', () => {
  getLatestBlock();
});
