import * as styles from './index.scss'; 
const axios = require('axios');
const ethers = require('ethers');
require('dotenv').config();

const ALCHEMY_URL = process.env.RINKEBY_URL;

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
   
    var table = document.createElement("table"), row, cellA, cellB, cellC, cellD;
    for (let i=0; i<transactions.length; i++){
      // (C2) ROWS & CELLS
      row = table.insertRow();
      cellA = row.insertCell();
      cellB = row.insertCell();
      cellC = row.insertCell();
      cellD = row.insertCell();
      cellE = row.insertCell();
      cellF = row.insertCell();

      // (C3) KEY & VALUE
      cellA.innerHTML = "From: ";
      cellB.innerHTML = `<a href="https://rinkeby.etherscan.io/address/${transactions[i].from}">${transactions[i].from}</a>`;
      cellC.innerHTML = "To: ";
      cellD.innerHTML = `<a href="https://rinkeby.etherscan.io/address/${transactions[i].to}">${transactions[i].to}</a>`;
      cellE.innerHTML = "Value: ";
      cellF.innerHTML = ethers.utils.formatEther(transactions[i].value) + " ETH";
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
