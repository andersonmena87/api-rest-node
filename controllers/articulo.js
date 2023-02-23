const fs = require('fs');
const path = require('path');
const Articulo = require('../models/Articulo');
const validar = require('../helpers/validar');

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: 'Acción de prueba en controlador de articulos'
    });
}

const curso = (req, res) => {

    return res.status(200).json([{
        curso: 'Angular',
        anio: 2021
    },
    {
        curso: 'React',
        anio: 2022
    }]);
}

const crear = (req, res) => {
    // Recoger parametros por post a guardar
    let parametros = req.body;

    //Validar datos
    try {
        validar(parametros);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar'
        });
    }

    // Crear el objeto a guardar

    const articulo = new Articulo(parametros); //Asigna de forma automatica

    //Asignar valores a objeto basado en el modelo (manual o automatico)
    //articulo.titulo = parametros.titulo;


    // Guardar el articuolo en la base datos
    articulo.save((error, articuloGuardado) => {
        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'No se ha guardado el articulo'
            });
        }

        //Devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo: articuloGuardado,
            mensaje: 'Articulo guardado con exito',
        });
    });
}

const listar = (req, res) => {
    //Trae todos los datos del mas viejo al mas nuevo
    //let consulta = Articulo.find({}).exec((error, articulos) => {
    let consulta = Articulo.find({});

    //capturando parametro de limite
    let limite = req.params.limite;
    if (limite) {
        console.log('limite', limite);
        consulta.limit(limite);
    }

    //Por defecto es fecha: 1 -> mas viejo al mas nuevo
    consulta.sort({ fecha: -1 }).exec((error, articulos) => {    //el paramentro fecha: -1, trae el mas nuevo al mas viejo

        if (error || !articulos) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'No se han encontrado articulos'
            });
        }

        return res.status(200).json({
            status: 'success',
            articulos,
            contador: articulos.length,
            mensaje: 'Articulos cargados con exito',
        })
    });
}

const uno = (req, res) => {
    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo
    Articulo.findById(id, (error, articulo) => {
        //Si no existe devolver error
        if (error || !articulo) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se ha encontrado el articulo'
            });
        }

        //Devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo,
            mensaje: 'Articulo encontrado con exito',
        })
    })
}

const borrar = (req, res) => {
    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo y borrar
    //Articulo.findOneAndDelete({_id: id}, (error, articulo) => {
    Articulo.findByIdAndDelete(id, (error, articulo) => {
        //Si no existe devolver error
        if (error || !articulo) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se ha encontrado el articulo'
            });
        }

        //Devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo,
            mensaje: 'Articulo eliminado con exito',
        })
    })
}

const editar = (req, res) => {
    //Recoger id articulo a editar
    let id = req.params.id;

    // Recoger los datos del body
    let parametros = req.body;

    //Validar datos
    try {
        validar(parametros);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar'
        });
    }

    //Buscar y actualizar articulo
    //Parametros findByIdAndUpdate ({consulta o where}, parametros, {new: false},callback) -> new por defecto es false,
    //usar new: true para retornar el objeto actualizado
    Articulo.findByIdAndUpdate(id, parametros, { new: true }, (error, ariculo_actualizado) => {
        if (error || !ariculo_actualizado) {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error al actualizar'
            });
        }

        //Devolver respuesta
        return res.status(200).json({
            status: 'success',
            articulo: ariculo_actualizado,
            mensaje: 'Articulo actualizado con exito'
        });
    })
}

const subir = (req, res) => {

    if (!req.file && !req.files) {
        return res.status(404).json({
            status: 'error',
            mensaje: 'Petición invalida no se ha cargado archivo'
        });
    }

    const { file } = req;

    //Configurar multer

    //Recoger el fichero de imagen

    //Nombre del archivo
    let archivo = file.originalname;

    //Extension del archivo
    let archivo_split = archivo.split('\.');
    let extension = archivo_split[1];

    //Comporbar extension correcta
    if (extension != "png" && extension != "jpg" && extension != "jepg" && extension != "gif") {
        //Borrar archivo y dar respuesta
        fs.unlink(file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Imagen invalida'
            });
        });
    } else {
        //Actualizar articulo
        //Recoger id articulo a editar
        let id = req.params.id;

        Articulo.findByIdAndUpdate(id, { imagen: file.filename }, { new: true }, (error, ariculo_actualizado) => {
            if (error || !ariculo_actualizado) {
                return res.status(500).json({
                    status: 'error',
                    mensaje: 'Error al actualizar'
                });
            }

            //Devolver respuesta
            return res.status(200).json({
                status: 'success',
                articulo: ariculo_actualizado,
                file,
                archivo_split,
                mensaje: 'Imagen de articulo actualizado con exito'
            });
        })
    }
}

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = `./imagenes/articulos/${fichero}`;
    fs.stat(ruta_fisica, (error, existe)=>{
        if(existe){
           return res.sendFile(path.resolve(ruta_fisica)); 
        }else{
            return res.status(404).json({
                status: 'error',
                mensaje: 'La imagen no existe',
                fichero,
                ruta_fisica
            });
        }
    });
}

const buscador = (req, res) => {
    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //find OR
    Articulo.find({ "$or": [
        //Si el titulo incluye el string de busqueda
        {"titulo": {"$regex": busqueda, "$options": "i"}},
        {"contenido": {"$regex": busqueda, "$options": "i"}},
    ]})
    .sort({fecha: -1})
    .exec((error, articulos_encontrados)=>{
        if (error || !articulos_encontrados || articulos_encontrados.length === 0) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se han encontrado articulos'
            });
        }

        //Devolver resultado
        return res.status(200).json({
            status: 'success',
            articulos: articulos_encontrados
        })
    }); 
    
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}