const {Keypair,Connection,PublicKey,LAMPORTS_PER_SOL,SystemProgram,sendAndConfirmTransaction}=require("@solana/web3.js");
const {encodeURL,createQR}=require("@solana/pay");
const bs58 = require('bs58');
const express=require('express');
const app= express();
const { NextApiRequest, NextApiResponse } =require('next');
require('dotenv').config();
const myWallet="EgBLkWPZ13jqmY7EyHGrPRxSnQG5LDpcE1EaKfk2qDkn";
const recipient= new PublicKey(myWallet);
const amount=0.1*LAMPORTS_PER_SOL;
const reference=Keypair.generate();
const label="Jumia pay";
const message="thanks for using our services";
const memo="jup30%";
const connection= new Connection(process.env.httpendpoint,{wss:process.env.wssendpoint},'confirmed');
const image='https://images.app.goo.gl/oDitNhq8DGCwc5kQA';
const signer=Keypair.fromSecretKey(bs58.default.decode(process.env.elvsec));

function geturlshi(){

  const encur=encodeURL({recipient,amount,reference,label,message,memo});
  const getqr=createQR(encur);
  const qrcode=getqr.toString('base64');
  return qrcode;

}
app.use(express.json());
 async function postres(){

     app.get('/',async(req,res){
       try{
       const accfield=req.body.account;
       console.log(`this is the the recipients account${accfield}`);
       const sig=SystemProgram.transfer({
         fromPubkey:signer.publicKey,
         toPubkey:"2dLU5sZjVSGn5vBux1qvwnfiPpTpTaJ6YXWQSofGTn3K",
         lamports:0.1*LAMPORTS_PER_SOL
       });
       const tx=new Transaction().add(sig);
       const txx=await sendAndConfirmTransaction(connection,tx,[signer]);
       res.status(200).json({message,txx})}
       catch (error){
      res.status(500).json({error:"did not work as expected"});
      }
     })

}

   function main(req,res){

    if(req.method==='GET'){
      const qrcode=geturlshi();
      res.status(200).json({label:label,icon:image,qrcode});
    }
    else if (req.method==='POST'){
      await postres();
    }
    else{
       res.status(405).json({ error: 'Method Not Allowed' });
    }

}
main();
