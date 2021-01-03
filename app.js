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
      "text": "Danny Torrence left a 1 star review for your property.",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Danny Torrence left the following review for your property:"
          }
        },
        {
          "type": "section",
          "block_id": "section567",
          "text": {
            "type": "mrkdwn",
            "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
            "alt_text": "Haunted hotel image"
          }
        },
        {
          "type": "section",
          "block_id": "section789",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Average Rating*\n1.0"
            }
          ]
        }
      ]
  });
    res.send(200);
  });


app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})