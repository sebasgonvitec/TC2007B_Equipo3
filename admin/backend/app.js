
const {MongoClient} = require("mongodb");
const express = require("express");
const bodyParser=require("body-parser"); 
const cors = require('cors');

// const https = require('https');
const bcrypt=require("bcrypt")
const mongo = require('mongodb');
// const fs = require('fs');

//NOTAS:
// - Ver como comunicar que el user ya existe en el front
// - Ver lo de quitar el if en el try pq no hace falta
//FALTA:
// - Borrar user
// - Editar User -> Hacer pantalla
// - NO PERMITIR QUE LA CUENTA ADMIN SE PUEDA BORRAR (q admin tenga su collection aparte)


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

app.get("/tablaCuentas", function(req, res) {
    db.collection("accounts").find({}).toArray(function(err, result){
        if(err) {
            handleError(res, err.message, "Failed to get accounts");
        }
        else {
            res.status(200).send(result);
        }
    })
})

app.delete("/borrarCuenta", function(req, res) {
    db.collection("accounts").deleteOne({"_id": mongo.ObjectId(req.query.id)}, (err, result) => {
        if (err) throw err;
    })
})
 
app.post("/crearCuenta", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.password;
    let area=req.body.area;
    let name=req.body.nombre;
    let nulidad=req.body.nulidad;
    let investigacion=req.body.investigacion;
    let otros=req.body.otros;

    console.log("usuario recibido")

    db.collection("accounts").findOne({usuario:user}, (err, result)=>{
    if(result!=null){
        console.log("El usuario ya existe")
        throw new Error('El usuario ya existe')
    }
    
    else{
        bcrypt.hash(pass, 10, (err, hash)=>{
        let aAgregar={usuario:user, password:hash, nombre:name, area:area, nulidad:nulidad, investigacion:investigacion, otros:otros}
        db.collection("accounts").insertOne(aAgregar, (err, result)=>{
            if (err) throw err;
            console.log("Usuario agregado")
        })
        })
    }
})
})

//Levantar la aplicacion
app.listen(1337, ()=>{
    connectToDB(); //sin parametros para que cuando se levante el app se conecte a la db
    console.log("Server started on port 1337...");
});












