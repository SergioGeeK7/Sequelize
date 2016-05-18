module.exports = function(sequelize, DataType) {
  var infcreditos = sequelize.define('infcreditos', {
        cedula:{ type: DataType.BIGINT
        },
        pagare:DataType.STRING
  },{
        timestamps: false
  });

  return infcreditos;
};