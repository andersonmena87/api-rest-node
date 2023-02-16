const { Router } = require('express');
const router = Router();

const ArticuloController = require('../controllers/articulo');

//Rutas de pruebas
router.get('/ruta-de-prueba', ArticuloController.prueba);
router.get('/ruta-curso', ArticuloController.curso);
router.post('/crear', ArticuloController.crear);


module.exports = router;



