const express = require('express');
const app = express();
var {exec }= require('child_process');
const delay = require('delay');
var githubUsername = 'nazeem-khan'


app.post("/webhooks/github", async function (req, res) {
        deploy(res);
})

function deploy(res){
    exec('./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        console.log(stdout)
        res.send(200);
      });
}


app.get("/", (req, res) => {
    res.send("webhooks testing....");
})

app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})