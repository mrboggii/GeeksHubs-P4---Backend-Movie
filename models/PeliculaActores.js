module.exports = (sequelize, type) => {
    const PeliculaActores = sequelize.define('PeliculaActores', {
        peliculaId: {
            type: type.INTEGER,
            references: {
                model: 'Peliculas',
                key: 'id'
              }
        },
        actorId: {
            type: type.INTEGER,
            references: {
                model: 'Actores',
                key: 'id'
              }
        },

    });
    return PeliculaActores;
};