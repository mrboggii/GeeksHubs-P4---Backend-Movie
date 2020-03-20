module.exports = (sequelize, type) => {
    const Cine = sequelize.define('Cines', {
        titulo: {
            type: type.STRING
        },
        provincia: {
            type: type.STRING
        },
    }, 
        {
            timestamps: true 
      })
      return Cine
    }