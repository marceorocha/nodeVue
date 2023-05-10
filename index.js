// const express = require('express'); //requiero el modulo que instalamos, esta en node modules. Despues lo comento porque paso a es6:
import express from 'express'
// const morgan = require ('morgan'); lo comente porque lo paso a es6 abajo:
import morgan from 'morgan'
// const cors=require('cors'); lo comente y lo pase a es6 abajo:
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes'

//conecion a la base de datos mongoDB
mongoose.Promise = global.Promise;
const dbUrl= 'mongodb://127.0.0.1:27017/dbsistema'; //cuando creemos los modelos y empecemos a mandar datos, se forma automaticamente esta base de datos
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology:true})  //useCreateIndex: true, eso lo saque de adentro porque me decia q no era compatible
.then(mongoose => console.log('conectando a la base de datos en el puerto 27017'))
.catch(err => console.log(err))


const app = express(); // este objeto va a ser una instancia a express, el objeto se llama app. 
//es un objeto que instancia a express.
app.use(morgan('dev')); //le indicamos que usamos morgan en desarrollo.
app.use(cors());

app.use(express.json()); //incorporada en express, analiza las cargas entrantes con las cargas utiles json (se basa en el analizador de cuerpos)
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public'))) //dirname es de js y nos muestra el directorio en el que estamos. dos guiones bajos
//este path.join nos va a mostrar el directorio independientemente del sistema operativo.

app.use('/api', router) //esto quiere decir que cuando entre a la url/api quien va a gestionar eso va a ser index.js de la carpeta routes (ahi esta el objeto router)

//ahora abajo uso el metodo listen() de express que es el metodo de escucha
// app.listen(3000,()=> { vamos a cambiar esto para que sea un puerto asignado por el servicio, servidor y no uno fijo:
    app.set('port', process.env.PORT || 3000); //el 3000 es en su defecto, si no abre otro, use el 3000

    // // esto de abajo lo voy a comentar porque todas las funciones middleware vamos a trabajarlas en el controlador
    // app.get('/hola', (req, res) => {
    //     res.end('hello, user!') //puedo poner .send o .end para saber que termina la respuesta y no queda esperando algo mas.
    //   })//aca estamos haciendo referencia a esa ruta, que nos responda eso. localhost:3000/hola nos daria hello user

    app.listen(app.get('port'),()=> {
    console.log('server on port ' + app.get('port') ); 
    
});
    /*por ahora al inicio, no tenemos un puerto en esta compu por defecto va a usar el puerto 3000, pero ya cuando despleguemos,
     y en el serivor nos asignen un puerto este va a cambiar */




