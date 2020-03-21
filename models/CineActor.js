module.exports = (sequelize, type) => {
    const CineActor = sequelize.define('CinePelicula', {
        cineId: {
            type: type.INTEGER,
            references: {
                model: 'Cines',
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
    return CinePelicula;
};