const { MongoClient } = require('mongodb');
const express = require("express");

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'ocean-node'

async function main() {

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('herois');
  
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World 2");
});

app.get("/oi", function (req, res) {
  res.send("Hi World");
});

const herois = ["Mulher Maravilha", "Capitã Marvel", "Homen de Ferro"];

app.get("/herois", async function(req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});


//POST
app.post("/herois", function(req, res) {
  
  
  const nome = req.body.nome;
  
  herois.push(nome);

  res.send("Criado com sucesso!");
});

//GET:ID
app.get("/herois/:id", function(req, res){
  const id = req.params.id;
  
  const item = herois[id - 1];
  
  res.send(item);
});

app.put("/herois/:id", function(req, res){
  const id = req.params.id;

  const novoNome = req.body.nome;

  herois[id - 1] = novoNome;

  res.send("Atualizado com sucesso!");
});

app.delete("/herois/:id", function(req, res){
  const id = req.params.id;
  
  delete herois[id - 1];
  
  res.send("Deletada");
});

app.listen(3333, function(){
  console.log('aplicacao funcionando e rodando na porta 3333')
});

};

main()
  //.catch(console.error)
  //.finally(() => client.close());