/*
 * API para la gestión del sistema de archivos
 *  
 * Autores:
 * - Andreína Isabel Sanánez
 * - Sebastián González
 * - Francisco Salcedo
 * - Andrea Diego
 * - Regina Rodríguez
 * 
 * 10/6/2022 
 * 
 */

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
const MongoStore = require("connect-mongo")
const app = express(); //intacia de express
const https = require('https');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//Dependecias de la app
app.use(bodyParser.json()); // definir body-parser como json
app.use(bodyParser.urlencoded({ extended: true })); // decirle a la app que use body-parser
app.use(cookieParser())
app.use(cors());

//Path a la base de datos
const DB_URL = "mongodb://127.0.0.1:27017/AO_DB";

// definir multer para que guarde los archivos en la carpeta .temp
const uploads = multer({dest: ".temp"})

//Conexión a la base de datos
function connectToDB(){
    let client = new MongoClient(DB_URL);
    client.connect();
    db = client.db();
}

//Endpoint Login
app.post("/login", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.password;

    db.collection("usuarios").findOne({usuario:user}, (err, result)=>{
      if(result!=null){
        bcrypt.compare(pass, result.password, (err, resultB)=>{
          if(resultB){
            let token = jwt.sign({
                usuario:user,
                exp: Math.floor(Date.now() / 1000) + (60 * 10),
                iat: Math.floor(Date.now())
              },'secretKey')
            res.json(token)
            // res.cookie("token", token)
            // res.json(result) // si las credenciales son correctas, regresar info del usuario
          }else{
            console.log("Credenciales Incorrectas")
            res.json(null) //indicar en front credenciales incorrectas
          }
        })
      }else{
        console.log("Credenciales Incorrectas")
        res.json(null) //indicar en front credenciales incorrectas
      }
    })
});

app.get("/login", (req, res)=>{
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null) 
        }
        else {
            let user=req.query.usuario;

            db.collection("usuarios").findOne({usuario:user}, { projection: { password: 0} }, (err, result)=>{
                if(err){
                    handleError(res, err.message, "Failed to get user");
                }else{
                    res.status(200).json(result);
                }
            });
        }
    })
});

//Endpoint para extraer expedientes de collecion nulidad
app.get("/nulidad", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null) 
        }
        else {
            console.log(userId)
            db.collection("nulidad").find({}).toArray(function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get nulidad");
                }else{
                    res.status(200).json(result);
                    
                }
            });

        }
    })    
})

//Endpoint para crear expedientes de collecion nulidad
app.post("/crearExpedienteNul", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }
        else { 
            let aInsertar = {
                nombre:req.body.nombre,
                numero:req.body.numero,
                expediente:req.body.expediente,
                actor:req.body.actor,
                estatus:req.body.estatus,
                fecha:req.body.fecha
            };
            db.collection("nulidad").insertOne(aInsertar, function(err, result){
            if(err){
                handleError(res, err.message, "Failed to create new expediente");
            }else{
                res.status(200).json(result);
            }
        })
        }   
    });
});

//Endpoint para extraer expedientes de collecion investigacion
app.get("/investigacion", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null) 
        }
        else {
            console.log(userId)
            db.collection("investigacion").find({}).toArray(function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get Carpetas de Investigación");
                }else{
                    res.status(200).json(result);
                    
                }
            });

        }
    })    
})

//Endpoint para crear expedientes de collecion investigacion
app.post("/crearExpedienteInv", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }
        else { 
            let aInsertar = {
                nombre:req.body.nombre,
                numero:req.body.numero,
                carpeta_inv:req.body.carpeta_inv,
                denunciante:req.body.denunciante,
                estatus:req.body.estatus,
                fecha:req.body.fecha
            };
            db.collection("investigacion").insertOne(aInsertar, function(err, result){
            if(err){
                handleError(res, err.message, "Failed to create new expediente");
            }else{
                res.status(200).json(result);
            }
            });
        }   
    });
});


//Mostrar archivos de un expediente en especifico
// La coleccion "pruebaUpload" almacena todos los archivos de todos los expedientes
app.get("/descargarArchivos", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("archivos").find({ "expediente": req.query.expediente }).toArray(function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get documentos de expediente");
                }else{
                    res.status(200).json(result);
                }
            }); 
        }
    });
});

//Descargar archivos por el nombre
app.get("/descargarArchivos/download", async (req, res) => {
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("archivos").findOne({"_id": mongo.ObjectId(req.query.id)}, function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get documentos de expediente");
                }else{
                    console.log(__dirname + "/.storage/" + req.query.nombre);
                    let temporal = __dirname + "/.temp/" + req.query.nombre + ".pdf";
                    let inputFS = fs.createReadStream(__dirname + result.path)
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
        }
    });
});

app.post("/subirArchivo", uploads.single("archivo"), (req, res)=>{
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else
        {
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
                let aInsertar = {nombre:req.body.nombre, folio:req.body.folio, path: rutaDefinitiva, fecha: req.body.fecha, expediente: req.body.expediente, expedienteNom: req.body.expedienteNom, usuario: req.body.usuario}
                console.log(req.body);
                db.collection("archivos").insertOne(aInsertar, (err, res)=>{
                    if(err) throw err;
                console.log(res);
                });
            });
    res.status(200).json({message:"Archivo subido correctamente"});
        }
    });
})

app.get("/tablaCuentas", function(req, res) {
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("usuarios").find({}, { projection: { password: 0} }).toArray(function(err, result){
                if(err) {
                    handleError(res, err.message, "Failed to get accounts");
                }
                else {
                    res.status(200).send(result);
                }
            })
        }
    });
});

app.delete("/borrarCuenta", function(req, res) {
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("usuarios").deleteOne({"_id": mongo.ObjectId(req.query.id)}, (err, result) => {
                if (err) throw err;
            })
        }
    });
})
 
app.post("/crearCuenta", (req, res)=>{
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json({msg: "No tiene los permisos, saquese alv"})
        }else {
            let user=req.body.usuario;
            let pass=req.body.password;
            let area=req.body.area;
            let name=req.body.nombre;
            let nulidad=req.body.nulidad;
            let investigacion=req.body.investigacion;
            let otros=req.body.otros;

            console.log("usuario recibido");

            db.collection("usuarios").findOne({usuario:user}, (err, result)=>{
            if(result!=null){
                console.log("El usuario ya existe")
                throw new Error('El usuario ya existe')
            }
    
            else{
                bcrypt.hash(pass, 10, (err, hash)=>{
                let aAgregar={usuario:user, password:hash, nombre:name, area:area, nulidad:nulidad, investigacion:investigacion, otros:otros}
                db.collection("usuarios").insertOne(aAgregar, (err, result)=>{
                    if (err) throw err;
                    console.log("Usuario agregado")
                    });
                });
                }
            })
        }
    });
});

//Obtener usuario por id
app.get("/editarUsuario", (req, res)=>{
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("usuarios").findOne({"_id": mongo.ObjectId(req.query.id)}, (err, result)=>{
                if(err) throw err;
                res.status(200).send(result);
            })
        }
    });
});

//Actualizar usuario seleccionado
app.post("/editarUsuario", (req, res)=>{
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                const updateData = { $set: { usuario:req.body.usuario, password:hash, nombre:req.body.nombre, area:req.body.area, nulidad:req.body.nulidad, investigacion:req.body.investigacion, otros:req.body.otros } };
                db.collection("usuarios").updateOne({"_id": mongo.ObjectId(req.query.id)}, updateData, (err, result)=>{
                    if(err) throw err;
                    res.status(200).send(result);
                });
            })
        }
    });
});

//Obtener archivos subidos por un usuario
app.get("/archivosUsuario", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("archivos").find({ "usuario": req.query.usuario }).toArray(function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get documentos de expediente");
                }else{
                    res.status(200).json(result);
                }
            }); 
        }
    });
});

//Borrar un archivo por id
app.delete("/borrarArchivo", function(req, res) {
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }else{
            db.collection("archivos").deleteOne({"_id": mongo.ObjectId(req.query.id)}, (err, result) => {
                if (err) throw err;
            })
        }
    });
})

// Endpoint para extraer bitacora de actividad

app.get("/bitacora", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }
        else {
            console.log(userId)
            db.collection("actividad").find({}).toArray(function(err, result){
                if(err){
                    handleError(res, err.message, "Failed to get activity logs.");
                }else{
                    res.status(200).json(result);

                }
            });

        }
    })
})

// Endpoint para crear registros de actividad

app.post("/registrarActividad", function(req, res){
    jwt.verify(req.headers.token, "secretKey", (err, userId) => {
        if(err){
            res.json(null)
        }
        else {
            let aInsertar = {
                usuario:req.body.usuario,
                fecha:req.body.fecha,
                accion: req.body.accion
                folio: req.body.folio
                area: req.body.area
            };
            db.collection("actividad").insertOne(aInsertar, function(err, result){
            if(err){
                handleError(res, err.message, "Failed to create new activity log");
            }else{
                res.status(200).json(result);
            }
            });
        }
    });
});


https.createServer({
    cert: fs.readFileSync("../Cert/app.cer"),
    key: fs.readFileSync('../Cert/app.key')
}, app).listen(443, () =>{
   connectToDB()
    console.log('Server started on port 443...');
});
