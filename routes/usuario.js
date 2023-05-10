import routerx from 'express-promise-router'
import usuarioController from '../controllers/UsuarioController'

const router = routerx()

router.post('/add', usuarioController.add)
//explico estas rutas: utilizo el verbo post, accedemos a la url para 'add', funcion de la categoria controller 'add'
router.get('/query', usuarioController.query)
router.get('/list', usuarioController.list)
router.put('/update', usuarioController.update)
router.delete('/remove', usuarioController.remove)
router.put('/activate', usuarioController.activate)
router.put('/deactivate', usuarioController.deactivate)
router.post('/login', usuarioController.login)
//estas rutas arriba hacen referencia a cada una de las funciones de nuestro controlador

export default router