const Sequelize = require('sequelize');
const PeliculasModel = require('./Peliculas.js');
const CinesModel = require('./Cines.js')
const ActoresModel = require('./Actores.js')
const CinePeliculasModel = require('./CinePeliculas.js')
const DBURL = 'mysql://root:9637416257bB@127.0.0.1:3306/netflix';

const sequelize = new Sequelize(DBURL);

const Peliculas = PeliculasModel(sequelize, Sequelize);
const Cines = CinesModel(sequelize, Sequelize);
const Actores = ActoresModel(sequelize, Sequelize);
const CinePeliculas = CinePeliculasModel(sequelize, Sequelize);


sequelize.sync()
.then(() => {
    console.log('Tablas Creadas')
});



module.exports = {
    Peliculas,
    Cines,
    Actores,
    CinePeliculas
};
