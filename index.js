const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//PELICULAS

const { Peliculas, CinePeliculas, PeliculaActores } = require('./models/sequelize')

app.get('/peliculas', (req, res) => {
    Peliculas.findAll().then(peliculas => {
        res.json(peliculas);
    });
});
app.post('/peliculas/nuevo', (req, res) => {
    console.log(req.body)
    let { titulo, anyo, duracion } = req.body;
    Peliculas.create({
        titulo,
        anyo,
        duracion
    })
        .then(() => {
            res.statusCode = 201;
            res.json({ status: "OK" })
        })
        .catch(err => {
            res.statusCode = 401;
            res.json({ status: "KO", message: err })
        })
});

app.get('/peliculas/:id', (req, res) => {
    let _id = req.params.id
    Peliculas.findOne({ where: { id: _id } }).then( async pelicula => {
        let myPelicula = {};
        const peliculaActores = await PeliculaActores.findAll({ attributes: ['actorId'], where: { peliculaId: pelicula.id } });
        // cinePeliculas >> [{peliculaId:1},{peliculaId:2}]
        const Op = Sequelize.Op;
        const actores = await Actores.findAll({ where: {id: {[Op.in]: peliculaActores.map(cp => cp.actorId)}}})
        myPelicula.titulo = pelicula.titulo;
        myPelicula.anyo = pelicula.anyo;
        myPelicula.duracion = pelicula.duracion;
       /* console.log(Object.keys(pelicula));
        for (const key of Object.keys(pelicula)) { //  ['titulo','duracion','anyo']
            myPelicula[key] = pelicula[key];
        } */ //si hubiesen x100 campos lo hariamos tal q asi
        myPelicula.actores = actores;
        res.json(myPelicula);
    });
});
app.get('/peliculasportitulo/:titulo', (req, res) => {
    let _titulo = req.params.titulo
    console.log(_titulo)
    Peliculas.findAll({ where: { titulo: _titulo } }).then(peliculas => {
        res.json(peliculas);
    });
});
app.put('/peliculas/:id', (req, res) => {
    let _id = req.params.id;
    let body = req.body;

    Peliculas.update(
        body,
        {
            where: { id: _id }
        }
    ).then(() => {
        res.statusCode = 200;
        res.json({ status: "OK" })
    }).catch(err => {
        res.statusCode = 401;
        res.json({ status: "KO", message: err })
    });
});
app.delete('/peliculas/:id', async (req, res) => {
    let id = req.params.id;
    const peliculas = await Peliculas.findOne({ where: { id } });

    if (peliculas) {
        const hasDestroyed = peliculas.destroy();
        if (hasDestroyed) {
            res.statusCode = 200;
            res.json({ status: "OK" })
        } else {
            res.statusCode = 401;
            res.json({ status: "KO 502", message: 'Datos incorrectos' })
        }
    } else {
        res.statusCode = 401;
        res.json({ status: "KO 503", message: 'Datos incorrectos' })
    }
})



//CINES

const { Cines } = require('./models/sequelize')

app.get('/cines', (req, res) => {
    Cines.findAll().then(async cines => {
        const Op = Sequelize.Op;
        let myCines = [];
        let myCine;

        for (const cine of cines) {
            myCine = {};
            const cinePeliculas = await CinePeliculas.findAll({ attributes: ['peliculaId'], where: { cineId: cine.id } });
            const peliculas = await Peliculas.findAll({ where: {id: {[Op.in]: cinePeliculas.map(cp => cp.peliculaId)}}})
            myCine.titulo = cine.titulo;
            myCine.provincia = cine.provincia;
            myCine.peliculaestreno = peliculas;
            myCines.push(myCine);
        }
        res.json(myCines);
    });
});
app.post('/cines/nuevo', (req, res) => {
    let { titulo, provincia, peliculasestreno } = req.body;
    Cines.create({
        titulo,
        provincia
    })
        .then( async (r) => {
            if (peliculasestreno) {
                for (let i = 0; i < peliculasestreno.length; i++) {
                    await CinePeliculas.create({
                        cineId: r.id,
                        peliculaId: peliculasestreno[i]
                    })
                }
            }
            res.statusCode = 201;
            res.json({ status: "OK" })
        })
        .catch(err => {
            res.statusCode = 401;
            res.json({ status: "KO", message: err })
        })
});

app.get('/cines/:id', (req, res) => {
    let _id = req.params.id
    Cines.findAll({ where: { id: _id } }).then( async cines => {
        let myCine = {};
        const cinePeliculas = await CinePeliculas.findAll({ attributes: ['peliculaId'], where: { cineId: cines[0].id } });
        // cinePeliculas >> [{peliculaId:1},{peliculaId:2}]
        const Op = Sequelize.Op;
        const peliculas = await Peliculas.findAll({ where: {id: {[Op.in]: cinePeliculas.map(cp => cp.peliculaId)}}})
        myCine.titulo = cines[0].titulo;
        myCine.provincia = cines[0].provincia;
        myCine.peliculaestreno = peliculas;
        res.json(myCine);
    });
});
app.get('/cinespornombre/:titulocine', (req, res) => {
    let _titulocine = req.params.titulo
    console.log(_titulocine)
    Cines.findAll({ where: { titulo: _titulocine } }).then(cines => {
        res.json(cines);
    });
});
app.get('/cinesporprovincia/:provincia', (req, res) => {
    let _provincia = req.params.provincia
    console.log(_provincia)
    Cines.findAll({ where: { provincia: _provincia } }).then(cines => {
        res.json(cines);
    });
});

app.put('/cines/:id', (req, res) => {
    let _id = req.params.id;
    let body = req.body;

    Cines.update(
        body,
        {
            where: { id: _id }
        }
    ).then(() => {
        res.statusCode = 200;
        res.json({ status: "OK" })
    }).catch(err => {
        res.statusCode = 401;
        res.json({ status: "KO", message: err })
    });
});
app.delete('/cines/:id', async (req, res) => {
    let id = req.params.id;
    const cines = await Cines.findOne({ where: { id } });

    if (cines) {
        const hasDestroyed = cines.destroy();
        if (hasDestroyed) {
            res.statusCode = 200;
            res.json({ status: "OK" })
        } else {
            res.statusCode = 401;
            res.json({ status: "KO 502", message: 'Datos incorrectos' })
        }
    } else {
        res.statusCode = 401;
        res.json({ status: "KO 503", message: 'Datos incorrectos' })
    }
})

//ACTORES 

const { Actores } = require('./models/sequelize')

app.get('/actores', (req, res) => {
    Actores.findAll().then(actores => {
        res.json(actores);
    });
});

app.post('/actores/nuevo', (req, res) => {
    console.log(req.body)
    let { nombre, edad, peliculas } = req.body;
    Actores.create({
        nombre,
        edad
    })
        .then( async (r) => {

            if (peliculas) {
                for (let i = 0; i < peliculas.length; i++) {
                    try {
                        await PeliculaActores.create({
                            peliculaId: peliculas[i],
                            actorId: r.id
                        })
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            res.statusCode = 201;
            res.json({ status: "OK" })
        })
        .catch(err => {
            res.statusCode = 401;
            res.json({ status: "KO", message: err })
        })
});

app.get('/actores/:id', (req, res) => {
    let _id = req.params.id
    Actores.findAll({ where: { id: _id } }).then(actores => {
        res.json(actores);
    });
});
app.get('/actorespornombre/:nombre', (req, res) => {
    let _nombre = req.params.nombre
    console.log(_nombre)
    Actores.findAll({ where: { nombre: _nombre } }).then(actores => {
        res.json(actores);
    });
});
app.put('/actores/:id', (req, res) => {
    let _id = req.params.id;
    let body = req.body;

    Actores.update(
        body,
        {
            where: { id: _id }
        }
    ).then(() => {
        res.statusCode = 200;
        res.json({ status: "OK" })
    }).catch(err => {
        res.statusCode = 401;
        res.json({ status: "KO", message: err })
    });
});
    
app.delete('/actores/:id', async (req, res) => {
    let id = req.params.id;
    const actores = await Actores.findOne({ where: { id } });

    if (actores) {
        const hasDestroyed = actores.destroy();
        if (hasDestroyed) {
            res.statusCode = 200;
            res.json({ status: "OK" })
        } else {
            res.statusCode = 401;
            res.json({ status: "KO 502", message: 'Datos incorrectos' })
        }
    } else {
        res.statusCode = 401;
        res.json({ status: "KO 503", message: 'Datos incorrectos' })
    }
});
    

app.listen(port, () => {
    console.log(`Logueado en server ${port}`)})
    