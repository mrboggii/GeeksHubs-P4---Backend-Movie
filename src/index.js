const express = require('express');
const app = express();

//configuracio servidor
app.set('port', process.env.PORT || 3000);     /*con process.env.PORT adopta el puerto del dispositivo desde el que se lee(por si es distinto al 3000)*/

//midlewares-(funciones que se ejecutan antes de que procesar nada)
app.use(express.json()); /*gracias a esto, express  puede leer los jSONs*/

//rutas
app.use(require('./rutas/peliculas.js'));

//servidor arrancau
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});
