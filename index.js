const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", function (req, res) {
  res.send("Hi World");
});


app.listen(3000,function(){
  console.log('aplicacao funcionando e rodando na porta 3000')
});