var ROOT = process.cwd();
var path= require("path"), http = require("http"), fs = require("fs");
var logging = require("log4js");
var logger = logging.getLogger('angoose');
logger.setLevel(logging.levels.DEBUG);

// angoose setup
console.log("Init angoose");

var options = {
    extensions:['angoose-users' ],
    modelDir:  './server',
    logging:'DEBUG',
    mongo_opts:'localhost:27017/test'
};    
var angoose = require("angoose");
angoose.init(null, options);
process.on('uncaughtException',function(e) {
    console.log(" Unhandled Error caught in server.js -----> : ",e,  e.stack);
});

// test code

var UserModel = require("angoose-users/user-model");

var u = new UserModel({
    email:'john@demo.com',
    password:'xxx',
    roles:'admin'
});

function setup(cb){
    UserModel.findOne({email:u.email}, function(err, user){
        console.log("Find result", err, user);
        if(user) return cb(user);        
        u.save(function(err){
            console.log("created user");
            cb(u);
        })
    })
}

setup(function(user){

    console.log("Got user", user)
    var service = angoose.client().module("LoginService");
    service.signin(u.email, "xxx", function(err, user){
       console.log("Login complete", err, user); 
       
       console.log("\n\n\n######## ")
       console.log(user? "SUCCESS!":"FAILED");
       
       //service.signout(u.email);
    });
    
})


