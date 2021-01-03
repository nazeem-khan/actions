require("dotenv").config();
const express = require('express');
const app = express();
var {exec }= require('child_process');
const delay = require('delay');
var githubUsername = 'nazeem-khan'
const axios = require("axios").default;
const { IncomingWebhook } = require('@slack/webhook');

const url = process.env.DISCORD_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

app.use(express.json());


// app.post("/webhooks/github", async function (req, res) {
//         deploy(res);
// })

async function deploy(res){
    exec('cd /home/ubuntu/pro/actions && ./dep.sh ',function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return stderr;
        }
         return stdout
      });
}


app.get("/", (req, res) => {
    res.send("something");
})

app.post("/github", async (req, res) => {
  await deploy(res);
    await webhook.send({
    "text":"The code has be deployed to cloud successfully !"
    });
    res.sendStatus(200);
  });


app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})