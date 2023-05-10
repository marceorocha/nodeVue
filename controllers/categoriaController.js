import { ReadConcern } from 'mongodb';
import Categoria from '../models';
import models from '../models'
export default { //export default se utiliza para exportar funciones, objetos,clases, expresiones desde archivos de script o modulos.
    add: async (req,res,next) => {
//dentro de esta funcion vamos a agregar capturador de excepciones en este caso try catch
        try {
            const reg = await models.Categoria.create(req.body); //mediante ajax vamosa recibir un objeto dentro del parametro req y lo vamos a recibir en el body
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
            const reg = await models.Categoria.findOne({_id:req.query._id})
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
            const reg = await models.Categoria.find({$or:[{'nombre':new RegExp(valor, 'i')},{'descripcion':new RegExp(valor, 'i')}]},{createdAt:0})
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
            const reg = models.Categoria.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre, descripcion:req.body.descripcion});
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
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id})
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
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:1})
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
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:0})

            res.status(200).json(reg);
            
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e)
        }
    }
}