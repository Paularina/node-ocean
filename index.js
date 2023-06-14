const { MongoClient , ObjectId } = require('mongodb');
const express = require("express");

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'ocean-node'

async function main() {
  //CONEXÃO
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('herois');
  
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World 2");
});

//LISTA HEROIS
const herois = ["Mulher Maravilha", "Capitã Marvel", "Homen de Ferro"];

//GET HEROIS
app.get("/herois", async function(req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});


//POST
app.post("/herois", async function(req, res) {
  
  const item = req.body;
  
  await collection.insertOne(item)
  
  res.send(item);
});

//GET:ID
app.get("/herois/:id", async function(req, res){
  const id = req.params.id;
  
  const item = await collection.findOne({
    _id: new ObjectId(id),
  })
  
  res.send(item);
});

//PUT
app.put("/herois/:id", async function(req, res){
  const id = req.params.id;

  const item = req.body;
  await collection.updateOne(
    {
      _id: new ObjectId(id)},
    {
      $set: item,
    }
  );

  res.send(item);
});


//DELETE
app.delete("/herois/:id", async function(req, res){
  
  const id = req.params.id;
  
  await collection.delete.deleteOne({
    _id: new ObjectId(id),
  })
  
  res.send("Deletado com sucesso!");
});


//APP LISTEN
app.listen(3333, function(){
  console.log('aplicacao funcionando e rodando na porta 3333')
});

};

main()
  //.catch(console.error)
  //.finally(() => client.close());