const { PublicKey,Keypair,Connection,clusterApiUrl,LAMPORTS_PER_SOL,SystemProgram,sendAndConfirmTransaction,Transaction }= require ("@solana/web3.js");
const bs58 = require('bs58');
const newaddress=Keypair.generate();
const httpendpoint="https://wispy-holy-liquid.solana-devnet.quiknode.pro/1fd4343334ec856218ad2f8467df6d3e7af6e5e3";
const webendpoint="wss://wispy-holy-liquid.solana-devnet.quiknode.pro/1fd4343334ec856218ad2f8467df6d3e7af6e5e3";
const connection=new Connection(httpendpoint,{wss:webendpoint});
//const sec=newaddress.secretKey;
const pub=new PublicKey("EgBLkWPZ13jqmY7EyHGrPRxSnQG5LDpcE1EaKfk2qDkn");
const getsec=bs58.default.decode("2Qn1Huxph2zq3Fa9yz5ReS8296L6C5xLTFEYq1466WwqjBqNpXT9XzdZhVEHpujjRkGkd9sdRCYKZ1SFBUiYaqdk");
const signer=Keypair.fromSecretKey(getsec);
//const pubnewad=signer.publicKey;
//console.log("new address:",pubnewad);
async function sendtx(){

  const sig=SystemProgram.transfer({
    fromPubkey:signer.publicKey,
    toPubkey:"2dLU5sZjVSGn5vBux1qvwnfiPpTpTaJ6YXWQSofGTn3K",
    lamports:0.1*LAMPORTS_PER_SOL
  });
  const tx=new Transaction().add(sig);
  const txx=await sendAndConfirmTransaction(connection,tx,[signer]);
  console.log("transaction confirmed with sig:",txx);
  const newbal=await connection.getBalance(newaddress.publicKey);
  console.log("this is the balance of newbal:",newbal);

}
async function main(){

const accounttowatch=Keypair.generate();
const actowatch=new PublicKey("6E4bWb7seV8uaeugLh6jtmPnU5mV2u8g6R7nSsYQcD3y");
const subscripid=await connection.onAccountChange(actowatch,(updatedaccountinfo)=>
console.log(`account notification for ${actowatch.toString()}`,updatedaccountinfo.lamports/LAMPORTS_PER_SOL,'sol'),"confirmed");
console.log("starting websocket...",subscripid);
}
 main();
//getb();
//sendtx();
