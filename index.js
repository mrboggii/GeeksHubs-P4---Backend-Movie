const express = require('express');
const app = express();
const port = 3000;

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