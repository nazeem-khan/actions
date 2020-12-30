const express = require('express');
const app = express();
var childProcess = require('child_process');
var githubUsername = 'nazeem-khan'
let secret = 'secret';

app.post("/webhooks/github", async function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;
    let gitSecret = req.body.secret;
    await delay(50000)
    if(branch.indexOf('master') > -1 && sender.login === githubUsername && gitSecret == secret){
        deploy(res);
    }
    else {
        res.send(500);
    }
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
    res.send("testing....testing");
})

app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})