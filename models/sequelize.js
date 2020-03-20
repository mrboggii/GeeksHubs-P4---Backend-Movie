const Sequelize = require('sequelize');
const PeliculaModel = require('./Pelicula.js');
const CineModel = require('./Cine.js')
const ActorModel = require('./Actor.js')
const DBURL = 'mysql://root:9637416257bB@127.0.0.1:3306/netflix';

const sequelize = new Sequelize(DBURL);

const Pelicula = PeliculaModel(sequelize, Sequelize);
const Cine = CineModel(sequelize, Sequelize);
const Actor = ActorModel(sequelize, Sequelize);


sequelize.sync()
.then(() => {
    console.log('Tablas Creadas')
});



module.exports = {
    Pelicula,
    Cine,
    Actor
};
