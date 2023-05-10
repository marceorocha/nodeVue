import routerx from 'express-promise-router'
import categoriaRouter from './categoria' //categoria.js seria pero no es necesario escribirlo
import articuloRouter from './articulo'
import usuarioRouter from './usuario'

const router = routerx() 

router.use('/categoria', categoriaRouter) //cuando se haga referencia a la url/categoria que se controle con el archivo categoria.js
router.use('/articulo', articuloRouter)
router.use('./usuario', usuarioRouter)//127.0.0.1/usuario apuntamos a usuarioRouter

export default router // ya tenemos indicado que las rutas se van a gestionar con categoria.js


