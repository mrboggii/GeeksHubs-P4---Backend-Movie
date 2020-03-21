module.exports = (sequelize, type) => {
    const Actores = sequelize.define('Actores', {
        nombre: {
            type: type.STRING
        },
        edad: {
            type: type.STRING
        },
        peliculas: {
            type: type.STRING
        }
    }, {
            timestamps: true 

      })

      Actores.associate = (models) => {
        Actores.belongsToMany(models.Actores, {
            through: 'PeliculaActores',
            as: 'aparece_en',
            foreignKey: 'actoresId'
        });
    };
      return Actores
    }