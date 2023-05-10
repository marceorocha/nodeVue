import routerx from 'express-promise-router'
import articuloController from '../controllers/ArticuloController'

const router = routerx()


//explico estas rutas: utilizo el verbo post, accedemos a la url para 'add', funcion de la categoria controller 'add'
router.post('/add',articuloController.add);
router.get('/query',articuloController.query);
router.get('/list',articuloController.list);
router.put('/update',articuloController.update);
router.delete('/remove',articuloController.remove);
router.put('/activate',articuloController.activate);
router.put('/deactivate',articuloController.deactivate);
//estas rutas arriba hacen referencia a cada una de las funciones de nuestro controlador

export default router;