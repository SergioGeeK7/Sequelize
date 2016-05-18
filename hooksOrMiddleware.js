var Sequelize = require("sequelize");
var connection = new Sequelize('pse','root','pse',{
    dialect:"mysql"
});
var bcrypt = require("bcryptjs");


var Article = connection.define("article",{
    slug:{
        type:Sequelize.STRING,
        primaryKey:true,
    },
    title:{
        type:Sequelize.STRING
    },
    body:{
        type: Sequelize.STRING
    }
},{
    hooks:{
        beforeValidate:function (){
            
        },
        afterValidate:function (article){
            article.dataValues.slug = bcrypt.hashSync(article.slug,8);
        },
        beforeCreate:function (){
            
        },  
        afterCreate:function (res){
            console.log(res.dataValues.slug,"has been inserted");
        }
    }
});

connection
    .sync({
        force:true
    })
    .then(function (){
        return Article.create({
            slug :"this is my slug id encrypted",
            title:"this is a title",
            body :"this is a body"
        });
    })
    .catch(console.log)