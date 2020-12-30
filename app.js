const express = require('express');
const app = express();
var childProcess = require('child_process');
const delay = require('delay');
var githubUsername = 'nazeem-khan'


app.post("/webhooks/github", async function (req, res) {
    await delay(50000)
        deploy(res);
})

function deploy(res){
    childProcess.exec('./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}


app.get("/", (req, res) => {
    res.send("webhooks testing....");
})

app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})