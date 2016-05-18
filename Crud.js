var Sequelize = require("sequelize");
var connection = new Sequelize('pse','root','pse',{
    dialect:"mysql"
});
var Article = connection.define("article",{
    slug:{
        type:Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    body:{
        type: Sequelize.STRING,
        allowNull:false
    },
    approved:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    cedula:Sequelize.BIGINT
});

var Asociados = connection.import("./asociados.js");
var Creditos = connection.import("./creditos.js");

Asociados.hasMany(Creditos  ,{foreignKey: {name:'cedula'}})
Creditos.belongsTo(Asociados,{foreignKey: 'cedula'})

connection
    .sync({
//        force:true,
        logging:console.log
    })
    .then(function (){
    
        Article.create({
            slug :"name",
            title:"name title",
            body :"this is the body of my article",
            approved:true,
            cedula:10184205 + Math.random() * 10
        },{
            fields:["slug","title","body","cedula"]
        });

        var articleInstance = Article.build({
            slug :"name",
            title:"name title",
            body :"this is the body of my article"
        });
    
        // return Article.bulkCreate([],{validate:true,ignoreDuplicates:true})
        // return Article.find([],{where:true,ignoreDuplicates:true})
        // return Article.findAll()
        return articleInstance.save();
    })
    .then(function (article){
        console.log("inserted",article.dataValues)
        return true;
    })
    .then(function (bool){
            
        return Asociados.findAll({
                include: [{
                    model: Creditos
                }]
            });
    
         // return Asociados.getInfcredito()
         // return Asociados.getArticles();
    
    })
    .then(function (result){
         result.forEach(function (item){
            if(item.dataValues.cedula === 1002282815) {
                console.log(item.dataValues.infcreditos.length);
            }
         });
    })
    .catch(console.log)