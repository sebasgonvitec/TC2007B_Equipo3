const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); //intacia de express

app.use(bodyParser.urlencoded({ extended: true })); // decirle a la app que use body-parser
app.use(bodyParser.json()); // definir body-parser como json
app.use(cors()); // decirle a la app que use cors

function connectToDB(){
    //let client = new MongoClient("mongodb://localhost/demoDB2"); // string de conexion dice que vamos a usar mongo en localhost (default) y la db demoDB2
    let client = new MongoClient("mongodb://127.0.0.1:27017/demoDB2");
    client.connect();
    db = client.db();
}

app.get("/", function(req, res){
    db.collection("nulidad").find({}).toArray(function(err, result){
        if(err){
            handleError(res, err.message, "Failed to get nulidad");
        }else{
            res.status(200).json(result);
            
        }
    });
})

app.get("/descargarArchivos", function(req, res){
    db.collection("nulidad").findOne({"nombre":req.query.nombre}, function(err, result){
        //db.getCollection("nulidad").aggregate([{$unwind:"$folios"}]).toArray(function(err, result){
        if(err){
            handleError(res, err.message, "Failed to get documentos de expediente");
        }else{
            res.status(200).json(result.folios);
        }
    }); 
});

app.listen(1337, () => {
    connectToDB();
    console.log("Server running on port 1337....");
});