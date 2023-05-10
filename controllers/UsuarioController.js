import { ReadConcern } from 'mongodb';
import Categoria from '../models';
import models from '../models'
import bcrypt from 'bcryptjs'
import Usuario from '../models';
import token from '../services/token';


export default { //export default se utiliza para exportar funciones, objetos,clases, expresiones desde archivos de script o modulos.
    add: async (req,res,next) => {
//dentro de esta funcion vamos a agregar capturador de excepciones en este caso try catch
        try {
            req.body.password =  await bcrypt.hash(req.body.password, 10); // aca recibimos por el body el password y lo encriptamos: The await bcrypt.hash function call generates a hashed password by taking the original password from req.body.password and using a one-way encryption algorithm to create a hash that is stored in the database instead of the original password.
            //The 10 argument passed to bcrypt.hash specifies the number of rounds to use when generating the hash. Increasing the number of rounds makes the hash more secure, but also increases the amount of time it takes to generate the hash. A value of 10 is a reasonable default value for most use cases.
            //By hashing the password before storing it, you are improving the security of your application. This ensures that even if someone gains access to the database, they will not be able to retrieve the original password, as the stored value will be the hash of the password.
            const reg = await models.Usuario.create(req.body); //mediante ajax vamosa recibir un objeto dentro del parametro req y lo vamos a recibir en el body
            //dicho objeto que recibimos lo enviamos al metodo create de mongose para poder almacenar ese objeto como un elemento en la coleccion categorias
            res.status(200).json(reg); // si todo sale bien devolvemos codigo 200 y mediante json el registro que se acaba de almacenar en la coleccion categoria
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error add'
            });
            next(e)
        }
    },
    query: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findOne({_id:req.query._id})
            if(!reg){
                res.status(404).send({
                    message:'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error query'
            });
            next(e)
        }
    },

    list: async (req,res,next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find({$or:[{'nombre':new RegExp(valor, 'i')},{'email':new RegExp(valor, 'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error list'
            });
            next(e)
        }
    },
    update:async (req,res,next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id})
            if(pas!=reg0.password){
            req.body.password = await bcrypt.hash(req.body.password,10)
            }
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{rol:req.body.rol,nombre:req.body.nombre,tipo_documento:req.body.tipo_documento,num_documento:req.body.num_documento,direccion:req.body.direccion,telefono:req.body.telefono,email:req.body.email,password:req.body.password});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
    },
    remove:async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
    },

    activate:async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id}, {estado:1})
            res.status(200).json(reg);
            
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id}, {estado:0})

            res.status(200).json(reg);
            
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
    },
    login: async (req,res,next) => {
        try {
            let user = await models.Usuario.findOne({email:req.body.email})
            if (user){
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user,tokenReturn})
                    res.json('password correcto')
                } else {
                    res.status(404).send({
                        message: 'Password no es correcto'
                    })
                }
            } else {
                res.status(404).send({
                    message:'no existe el usuario'
                })
            }
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
}}