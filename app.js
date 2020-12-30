const express = require('express');
const app = express();
var {exec }= require('child_process');
const delay = require('delay');
var githubUsername = 'nazeem-khan'


app.post("/webhooks/github", async function (req, res) {
        deploy(res);
})

function deploy(res){
    exec('exit && /home/ubuntu/deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        console.log("ggg")
        res.send(200);
      });
}


app.get("/", (req, res) => {
    res.send("loooolS");
})

app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})