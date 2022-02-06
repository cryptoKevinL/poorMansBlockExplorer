import * as styles from './index.scss'; 
const SHA256 = require('js-sha256');
const port = 4000; //TODO: bootstrap port 4000 is "well known" peer...
const server = `http://localhost:${port}`;

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const key = ec.genKeyPair();
//TODO: longer term, we would do this locally, and interface/wallet generate and store the private key
const publicKey = key.getPublic().encode('hex');
const privateKey = key.getPrivate().toString('hex');
//TODO: we need to announce these keys to the network 

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("blocknum").innerHTML = 0;
    return;
  }

  // fetch(`${server}/balance/${value}`).then((response) => {
  //   return response.json();
  // }).then(({ balance }) => {
  //   document.getElementById("balance").innerHTML = balance;
  // });
  fetch(`${server}/blocknum`).then((response) => {
      return response.json();
    }).then(({ blocknum }) => {
      document.getElementById("blocknum").innerHTML = blocknum;
    });
  
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  const senderPrivKey = document.getElementById("sender-privateKey").value;
  const key = ec.keyFromPrivate(senderPrivKey);

  const bodyLocal = JSON.stringify({
    sender, amount, recipient
  });

  const msgHash = SHA256(bodyLocal);
  const signature = key.sign(msgHash.toString());
  const rSig = signature.r.toString(16);
  const sSig = signature.s.toString(16);

  const body = JSON.stringify({
    sender, amount, recipient, rSig, sSig
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});
