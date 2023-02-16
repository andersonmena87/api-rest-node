const { Router } = require('express');
const router = Router();

const ArticuloController = require('../controllers/articulo');

//Rutas de pruebas
router.get('/ruta-de-prueba', ArticuloController.prueba);
router.get('/ruta-curso', ArticuloController.curso);

//Ruta util
router.post('/crear', ArticuloController.crear);

//url con paramentro obligatorio -> '/articulos/:limite'
//url con paramentro opcional -> '/articulos/:limite?'
router.get('/articulos/:limite?', ArticuloController.listar);

router.get('/articulo/:id', ArticuloController.uno);
router.delete('/articulo/:id', ArticuloController.borrar);
router.put('/articulo/:id', ArticuloController.editar);


module.exports = router;



