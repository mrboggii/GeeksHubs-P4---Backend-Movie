module.exports = (sequelize, type) => {
    const Peliculas = sequelize.define('Peliculas', {
        titulo: {
            type: type.STRING
        },
        anyo: {
            type: type.DATE
        },
        duracion: {
            type: type.TIME
        }
    }, {
            timestamps: true 

      })

      Peliculas.associate = (models) => {
        Peliculas.belongsToMany(models.Cines, {
            through: 'CinePeliculas',
            as: 'se_estrena_en',
            foreignKey: 'peliculaId'
        });
    };
      return Peliculas
    }