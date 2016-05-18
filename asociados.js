module.exports = function(sequelize, DataType) {
  var asociados = sequelize.define('ASOCIADOS', {
        cedula:{ type: DataType.BIGINT,
                 primaryKey:true
        }
  },{
        timestamps: false
  });

  return asociados;
};