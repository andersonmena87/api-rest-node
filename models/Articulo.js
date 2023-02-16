const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: 'default.png'
    }
});

module.exports = model('Articulo', ArticuloSchema); //mongoose convierte Articulo a articulos

//Se Puede exportar indicando en el tercer parametro el nombre de la colección
// module.exports = model('Articulo', ArticuloSchema, 'articulos');