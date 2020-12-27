const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.send("hey there this is a sample website");
})

app.listen(3000, (err) => {
    console.log('connected to 3000!!')
})