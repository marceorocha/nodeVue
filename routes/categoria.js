import routerx from 'express-promise-router'
import categoriaController from '../controllers/CategoriaController'

const router = routerx()

router.post('/add', categoriaController.add)
//explico estas rutas: utilizo el verbo post, accedemos a la url para 'add', funcion de la categoria controller 'add'
router.get('/query', categoriaController.query)
router.get('/list', categoriaController.list)
router.put('/update', categoriaController.update)
router.delete('/remove', categoriaController.remove)
router.put('/activate', categoriaController.activate)
router.put('/deactivate', categoriaController.deactivate)
//estas rutas arriba hacen referencia a cada una de las funciones de nuestro controlador

export default router