module.exports = (sequelize, type) => {
    const Cines = sequelize.define('Cines', {
        titulo: {
            type: type.STRING
        },
        provincia: {
            type: type.STRING
        },
    },
    {
        timestamps: true 
    }
    );

    Cines.associate = (models) => {
        Cines.belongsToMany(models.Peliculas, {
            through: 'CinePeliculas',
            as: 'peliculasestreno',
            foreignKey: 'cineId'
        });
    };

    return Cines
}