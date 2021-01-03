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
    res.send("done with this");
})

app.post("/github", async (req, res) => {
  const print =await deploy(res);
    // const content = "You did it !";
    // const avatarUrl = "https://media.giphy.com/media/SfYTJuxdAbsVW/giphy.gif";
    // await axios
    //   .post(process.env.DISCORD_WEBHOOK_URL, {
    //     content: content,
    //     embeds: [
    //       {
    //         image: {
    //           url: avatarUrl,
    //         },
    //       },
    //     ],
    //   })
    //   .then((discordResponse) => {
    //     console.log("Success!");
    //     res.status(204).send();
    //   })
    //   .catch((err) => console.error(`Error sending to Discord: ${err}`));

    await webhook.send({
      text: `The Code has been deployed , here are the logs - ${print}`,
    });
    res.send(200);
  });


app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})