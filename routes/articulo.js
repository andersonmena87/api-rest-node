const multer = require('multer'); //middleware para control de archivos
const { Router } = require('express');
const ArticuloController = require('../controllers/articulo');

const router = Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos/');
    },
    filename: (req, file, cb) => {
        cb(null, 'articulo' + Date.now() + file.originalname);
    }
});

const subidas = multer({storage: almacenamiento});

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
router.post('/subir-imagen/:id', [subidas.single("file0")],ArticuloController.subir); // El middleware se ejecuta antes del controlador
router.get('/imagen/:fichero', ArticuloController.imagen);
router.get('/buscar/:busqueda', ArticuloController.buscador);

module.exports = router;



