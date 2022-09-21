
const {MongoClient} = require("mongodb");
const express = require("express");
const bodyParser=require("body-parser"); 
const cors = require('cors');


const app = express(); // aplicacion / instancia de express

app.use(bodyParser.urlencoded({extended:true})); // decirle a la app que use body-parser
app.use(bodyParser.json()); // definir body parser para entender json
app.use(cors());

//Definir conexion a la DB
function connectToDB()
{
    let client = new MongoClient("mongodb://localhost/demoDB"); // string de conexion dice que vamos a usar mongo en localhost (default) y la db casos
    client.connect(); // que se conecte a la base de datos
    db = client.db(); 
}

// app.get('/nulidad', (req, res) => {
//     res.json({nombre: "Archivo1", numero: 1, expediente: "df/1337-2894"})
// })

app.get("/", function(req, res) {
    db.collection("nulidad").find({}).toArray(function(err, result){
        if(err) {
            handleError(res, err.message, "Failed to get nulidad");
        }
        else {
            res.status(200).send(result);
            // res.status(200).json(result);
            // console.log(res);
        }
    })
})

//Levantar la aplicacion
app.listen(1337, ()=>{
    connectToDB(); //sin parametros para que cuando se levante el app se conecte a la db
    console.log("Server started on port 1337...");
});












