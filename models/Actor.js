module.exports = (sequelize, type) => {
    const Actor = sequelize.define('Actor', {
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
      return Actor
    }