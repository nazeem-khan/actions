require("dotenv").config();
const express = require('express');
const app = express();
var {exec }= require('child_process');
const delay = require('delay');
var githubUsername = 'nazeem-khan'
const axios = require("axios").default;

app.use(express.json());


// app.post("/webhooks/github", async function (req, res) {
//         deploy(res);
// })

function deploy(res){
    exec('cd /home/ubuntu/pro/actions && ./dep.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        console.log(stdout)
      });
}


app.get("/", (req, res) => {
    res.send("cooool");
})

app.post("/github", (req, res) => {
  deploy(res);
    const content = "Successfully Deployed";
    const avatarUrl = "https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif";
    axios
      .post(process.env.DISCORD_WEBHOOK_URL, {
        content: content,
        embeds: [
          {
            image: {
              url: avatarUrl,
            },
          },
        ],
      })
      .then((discordResponse) => {
        console.log("Success!");
        res.status(204).send();
      })
      .catch((err) => console.error(`Error sending to Discord: ${err}`));
  });


app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})