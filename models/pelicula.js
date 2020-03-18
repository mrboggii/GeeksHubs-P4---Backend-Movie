module.exports = (sequelize, type) => {
    const Pelicula = sequelize.define('Pelicula', {
        titulo: {
            type: type.STRING
        },
        año: {
            type: type.DATE
        },
        duracion: {
            type: type.TIME
        }
    }, {
            timestamps: true 

      })
      return Pelicula
    }