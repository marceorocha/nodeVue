import mongoose, {Schema} from "mongoose";

//voy a crear el primer Schema: https://mongoosejs.com/docs/guide.html ahi dice todo
const categoriaSchema = new Schema({
    nombre:{type:String, maxlength:50,unique:true,required:true},
    descripcion: {type:String,maxlength:255},
    estado: {type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});
//ahora a este esquema lo voy a convertir en un modelo que va a ser categoria
const Categoria = mongoose.model('categoria',categoriaSchema);

export default Categoria;

