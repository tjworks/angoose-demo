var ROOT = process.cwd();
var path= require("path"), http = require("http"), fs = require("fs");
var express = require("express");
var logging = require("log4js");
var logger = logging.getLogger('angoose');
logger.setLevel(logging.levels.DEBUG);
var app = express();
app.configure(function() {
    app.set('port', 8080);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: '1234567890QWERTY'}));
    app.use(app.router);
    app.use(function(err, req, res, next){
        console.log("In default error handling", err)
        res.send(500, 'Unhandled error: '+ err);
    });
    app.use(express.methodOverride());
    app.use(express.static( './public'));
});

var options = {
    extensions:['angoose-users', 'angoose-authorization', 'angoose-ui'],
    'module-dirs':  './server',
    logging:'TRACE',
    mongo_opts:'localhost:27017/test',
    'angoose-authorization':{
        'model-name':'Role'
    }
};    
require("angoose").init(app, options);

app.get("/todomvc", function(req, res){
    res.writeHead(200, { "Content-Type" : "text/html" });
    fs.createReadStream("./public/todomvc.html").pipe(res); 
});

function demo(req, res){
    res.writeHead(200, { "Content-Type" : "text/html" });
    fs.createReadStream("./public/ui-demo.html").pipe(res); 
}
app.get("/deform/*", demo); 
app.get("/login", demo); 
app.get("/logout", demo);

http.createServer(app).listen(8080);

process.on('uncaughtException',function(e) {
    console.log(" Unhandled Error caught in server.js -----> : ",e,  e.stack);
});
 