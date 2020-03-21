module.exports = (sequelize, type) => {
    const Actores = sequelize.define('Actores', {
        nombre: {
            type: type.STRING
        },
        peliculas: {
            type: type.STRING
        },
        edad: {
            type: type.STRING
        }
    }, {
            timestamps: true 

      })
      return Actores
    }