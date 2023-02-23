const validator = require('validator');

const validar = (parametros) => {
    let parametro_titulo = !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, { min: 2, max: 20 });
    let parametro_contenido = !validator.isEmpty(parametros.contenido);

    console.log(validator.isLength(parametros.titulo, { min: 2, max: 20 }));

    if (!parametro_titulo || !parametro_contenido) {
        throw new Error('Error');
    }
}

module.exports = validar;