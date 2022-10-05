const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongo = require('mongodb');
const bcrypt=require("bcrypt")
const session=require("express-session")
const MongoStore= require("connect-mongo")
const app = express(); //intacia de express
const https = require('https');

app.use(bodyParser.json()); // definir body-parser como json
app.use(bodyParser.urlencoded({ extended: true })); // decirle a la app que use body-parser
app.use(cors()); // decirle a la app que use cors

const DB_URL = "mongodb://127.0.0.1:27017/demoDB";

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: DB_URL})
}))

const uploads = multer({dest: ".temp"}) // definir multer para que guarde los archivos en la carpeta .temp

function connectToDB(){
    //let client = new MongoClient("mongodb://localhost/demoDB2"); // string de conexion dice que vamos a usar mongo en localhost (default) y la db demoDB2
    let client = new MongoClient(DB_URL);
    client.connect();
    db = client.db();
}

app.post("/login", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.password;

    db.collection("accounts").findOne({usuario:user}, (err, result)=>{
      if(result!=null){
        bcrypt.compare(pass, result.password, (err, resultB)=>{
          if(resultB){
            res.json(result)
            // req.session.usuario=user;
            // res.redirect('/home');
          }else{
            console.log("Credenciales Incorrectas")
            res.json(null)
            // res.redirect('http://localhost:3000/login');
          }
        })
      }else{
        console.log("Credenciales Incorrectas")
        res.json(null)
        // res.redirect('http://localhost:3000/login');
      }
    })
  })

  
// app.get("/logout", (req, res)=>{
//     req.session.destroy();
//     res.redirect("/home");
// })


app.get("/", function(req, res){
    db.collection("nulidad").find({}).toArray(function(err, result){
        if(err){
            handleError(res, err.message, "Failed to get nulidad");
        }else{
            res.status(200).json(result);
            
        }
    });
})

app.post("/crearExpediente", function(req, res){
    let aInsertar = {nombre:req.body.nombre, numero:req.body.numero, expediente:req.body.expediente, actor:req.body.actor, estatus:req.body.estatus, fecha:req.body.fecha}
    db.collection("nulidad").insertOne(aInsertar, function(err, result){
        if(err){
            handleError(res, err.message, "Failed to create new expediente");
        }else{
            res.status(200).json(result);
        }
    });
})

//Mostrar archivos de un expediente en especifico
app.get("/descargarArchivos", function(req, res){
    db.collection("pruebaUpload").find({ "expediente": req.query.expediente }).toArray(function(err, result){
        if(err){
            handleError(res, err.message, "Failed to get documentos de expediente");
        }else{
            res.status(200).json(result);
        }
    }); 
});

//Descargar archivos por el nombre
app.get("/descargarArchivos/download", async (req, res) => {
    console.log(req.query);
    db.collection("pruebaUpload").findOne({"_id": mongo.ObjectId(req.query.id)}, function(err, result){
        if(err){
            handleError(res, err.message, "Failed to get documentos de expediente");
        }else{
            console.log(__dirname + "/.storage/" + req.query.nombre);
            let temporal = __dirname + "/.temp/" + req.query.nombre + ".pdf";
            let inputFS = fs.createReadStream(__dirname + result.archivo)
            let outputFS = fs.createWriteStream(temporal)

            let key = "abcabcabcabcabcabcabcabcabcabc12" //Not to be done, key usually goes encrypted as well 32 bytes(256 bits) 
            let iv = "abcabcabcabcabc1" //(initialization vector) 16 bytes

            let cipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
            inputFS.pipe(cipher).pipe(outputFS)
            outputFS.on("finish", ()=>{
                console.log(temporal);
                res.set({
                    'Content-Type': 'application/pdf'
                })
                res.download(temporal, function(err){
                    if(err) throw err;
                    fs.unlinkSync(temporal);
                })
            })
        }
    }); 
});

app.post("/subirArchivo", uploads.single("archivo"), (req, res)=>{
    console.log(__dirname + "/.storage/" + req.body.nombre);
    let rutaDefinitiva = "/.storage/" + req.body.nombre;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" + req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + "/.storage/" + req.body.nombre)

    let key = "abcabcabcabcabcabcabcabcabcabc12" //Not to be done, key usually goes encrypted as well 32 bytes(256 bits) 
    let iv = "abcabcabcabcabc1"

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", ()=>{
        fs.unlinkSync(__dirname + "/.temp/" + req.file.filename)
        let aInsertar = {nombre:req.body.nombre, folio:req.body.folio, archivo: rutaDefinitiva, fecha: req.body.fecha, expediente: req.body.expediente}
        console.log(req.body);
        db.collection("pruebaUpload").insertOne(aInsertar, (err, res)=>{
            if(err) throw err;
            console.log(res);
        })
    })
    res.status(200).json({message:"Archivo subido correctamente"});
})

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

// app.listen(1337, () => {
//     connectToDB();
//     console.log("Server running on port 1337....");
// });

https.createServer({
    cert: fs.readFileSync("../Cert/app.cer"),
    key: fs.readFileSync('../Cert/app.key')
}, app).listen(443, () =>{
   connectToDB()
    console.log('Server started on port 443...');
});
