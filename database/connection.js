//Import
const mongoose = require('mongoose');

const connection = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog');
        //Parametros dentro de connect // solo en caso de aviso
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log('Conectado correctamente a la base de datos mi_blog');

    } catch (error) {
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    connection
}