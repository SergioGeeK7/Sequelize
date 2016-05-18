var Sequelize = require("sequelize");
var connection = new Sequelize('pse','root','pse',{
    dialect:"mysql"
});
var Article = connection.define("article",{
    slug:{
        type:Sequelize.STRING,
        primaryKey:true,
        
    },
    title:{
        type:Sequelize.STRING,
        unique:true, // no duplicate title can be injected
        allowNull:false
    },
    body:{
        type: Sequelize.STRING,
        //defaultValue:"Comming soon ..."
    }
},{
    timestamps:true,
    freezeTableName:true // pluralize
});

connection.sync({
    force:true,
    logging:console.log
}).then(function (){
    console.log("Funciono")
}).catch(console.log)