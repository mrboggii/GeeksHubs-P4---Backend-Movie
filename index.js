const express = require('express');
const app = express();
const port = 3000;

//PELICULAS

const {Pelicula} = require('./models/sequelize')

app.get('/peliculas', (req, res) => {
    res.send('GET /peliculas')
})
app.post('/peliculas/nuevo', (req, res) => {
    res.send('POST /peliculas/nuevo')
})

app.get('peliculas/:id', (req, res) => {
    res.send('GET /peliculas/:id')
})
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