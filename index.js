const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

//Inicializar app
console.log('Hola mundo!!');


//Conectar a la base de datos
connection();


//Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

//Convertir body a objeto JS
app.use(express.json()); //PARA RECIBIR DATOS CON Content-Type: app/json
app.use(express.urlencoded({extended: true})); //PARA RECIBIR CON Content-Type: application/x-www-form-urlencoded (así los manda un formulario normal)


//Crear rutas

//RUTAS
const rutas_articulo = require('./routes/articulo');

//Cargo las rutas
app.use('/api', rutas_articulo);


//Rutas de prueba
app.get('/probando', (req, res) => {
    console.log('Se ha ejecutado el endpoint probando');

    //Send puede devolver HTML, JSON, objetos, texto etc
    // return res.status(200).send(`
    //     <div>
    //         <h1>Probando ruta con nodeJS</h1>
    //         <p>Creando api rest con node</p>
    //     </div>
    // `);


    //Usar json es mas practico
    return res.status(200).json({
        curso: 'Master en React',
        autor: 'Anderson'
    });


    //devolviendo json con send
    return res.status(200).send({
        curso: 'Master en React',
        autor: 'Anderson'
    });
})

app.get('/', (req, res) => {
    console.log('Se ha ejecutado el endpoint /');

    //Send puede devolver HTML, JSON, objetos, texto etc
    return res.status(200).send(`
        <div>
            <h1>Probando ruta con nodeJS</h1>
            <p>Creando api rest con node</p>
        </div>
    `);

})


// Crear servidor y escuchar peticiones http
app.listen(puerto, () => console.log('Servidor corriendo en el puerto '+ puerto));