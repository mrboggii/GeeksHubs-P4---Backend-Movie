const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//PELICULAS

const {Pelicula} = require('./models/sequelize')

app.get('/peliculas', (req, res) => {
    Pelicula.findAll().then( peliculas => {
        res.json(peliculas);
    });
});
app.post('/peliculas/nuevo', (req, res) => {
    console.log(req.body)
    let { titulo, anyo, duracion } = req.body;
    Pelicula.create({
        titulo,
        anyo,
        duracion        
    })
    .then( () => {
        res.statusCode = 201;
        res.json({status: "OK"})
    })
    .catch( err => {
        res.statusCode = 401;
        res.json({status: "KO", message: err})
    })
});

app.get('/peliculas/:id', (req, res) => {
    let _id = req.params.id
    Pelicula.findAll({ where: { id: _id }}).then( peliculas => {
        res.json(peliculas);
    });
});
app.get('/peliculasportitulo/:titulo', (req, res) => {
    let _titulo = req.params.titulo
    console.log(_titulo)
    Pelicula.findAll({ where: { titulo: _titulo }}).then( peliculas => {
        res.json(peliculas);
    });
});
app.put('/peliculas/:id',(req, res) => {
    res.send('PUT /peliculas/:id')
})
app.delete('/peliculas/:id', (req, res) => {
    res.send('DELETE /peliculas/:id')
})

app.listen(port, () => {
    console.log(`Logueado en server ${port}`)
})

//CINES

const {Cine} = require('./models/sequelize')

app.get('/cines', (req, res) => {
    res.send('GET /cines')
})
app.post('/cines/nuevo', (req, res) => {
    res.send('POST /cines/nuevo')
})

app.get('cines/:id', (req, res) => {
    res.send('GET /cines/:id')
})
app.put('/cines/:id',(req, res) => {
    res.send('PUT /cines/:id')
})
app.delete('/cines/:id', (req, res) => {
    res.send('DELETE /cines/:id')
})

//ACTORES 

const {Actor} = require('./models/sequelize')

app.get('/actores', (req, res) => {
    res.send('GET /actores')
})
app.post('/actores/nuevo', (req, res) => {
    res.send('POST /actores/nuevo')
})

app.get('actores/:id', (req, res) => {
    res.send('GET /actores/:id')
})
app.put('/actores/:id',(req, res) => {
    res.send('PUT /actores/:id')
})
app.delete('/actores/:id', (req, res) => {
    res.send('DELETE /actores/:id')
})