const validator = require('validator');
const Articulo = require('../models/Articulo');

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
        let parametro_titulo = !validator.isEmpty(parametros.titulo) && 
                                validator.isLength(parametros.titulo, {min: 2, max:10});
        let parametro_contenido = !validator.isEmpty(parametros.contenido);

        console.log(validator.isLength(parametros.titulo, {min: 2, max:10}));

        if(!parametro_titulo || !parametro_contenido){
            throw new Error('Error');
        }
    } catch (error) {
        return res.status(400).json({
            accion: 'Error',
            mensaje: 'Faltan datos por enviar'
        });
    }

    // Crear el objeto a guardar

    const articulo = new Articulo(parametros); //Asigna de forma automatica

    //Asignar valores a objeto basado en el modelo (manual o automatico)
    //articulo.titulo = parametros.titulo;


    // Guardar el articuolo en la base datos
    articulo.save((error, articuloGuardado) => {
        if(error || !articuloGuardado){
            return res.status(400).json({
                accion: 'Error',
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

module.exports = {
    prueba,
    curso,
    crear
}