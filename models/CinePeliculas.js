module.exports = (sequelize, type) => {
    const CinePeliculas = sequelize.define('CinePeliculas', {
        cineId: {
            type: type.INTEGER,
            references: {
                model: 'Cines',
                key: 'id'
              }
        },
        peliculaId: {
            type: type.INTEGER,
            references: {
                model: 'Peliculas',
                key: 'id'
              }
        },

    });
    return CinePeliculas;
};