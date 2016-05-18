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
        allowNull:false,
        validate:{
            len: {
                args:[10,150],
                msg : "Please enter a title with at lest 10 chars but no more then 15"
            }
        }
    },
    body:{
        type: Sequelize.STRING,
        //defaultValue:"Comming soon ..."
        validate:{
            startWithUpper:function (bodyVal){
                var first = bodyVal.charAt(0);
                var isLowerCase = first.toUpperCase() !== first;
                if(isLowerCase)
                    throw new Error("Firts letter must be an uppercase letter");
                
            }
        }
    }
},{
    timestamps:true,
    freezeTableName:true // pluralize
});

connection
    .sync({
        force:true,
        logging:console.log
    })
    .then(function (){
        return Article.create({slug:"oe",title:"sadfasdfsdfsdfeu",body:"Hi"})
    })
    .catch(function (err){
        console.log(err)
    });