var Sequelize = require("sequelize");
var connection = new Sequelize('pse','root','pse',{
    dialect:"mysql"
});
var Article = connection.define("article",{
    title:Sequelize.STRING,
    body :Sequelize.STRING
});

connection.sync()
          .then(function (){
    
    Article.findById(1)
           .then(function (article){
            console.log(article.dataValues) 
    });
    
    Article.findAll().then(function (article){
            console.log(article.length) 
    });
    
    
    /*Article.create({
        title:"title",
        body:"body example"
    })*/
})