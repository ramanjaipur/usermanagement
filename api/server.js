'use strict';
var restify = require('restify');
var  fs = require('fs');
const corsMiddleware = require('restify-cors-middleware');

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

//configuration
mongoose.connect(configDB.url,{ useMongoClient: true }); // connect to our database


var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})
 const cors = corsMiddleware({
  origins: ['*'] // an array of origins
});

 var server = restify.createServer();
 
server
    .use(restify.plugins.fullResponse())
    .use(restify.plugins.bodyParser({ requestBodyOnGet: true}));

server.pre(cors.preflight);
server.use(cors.actual);
/*app.use(function(req, res, next) {
  console.log(req.headers);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
             "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
*/



/*Set global varibale for views*/
global.env = process.env;


 // routes ======================================================================
require('./config/routes.js')(server,controllers); // load our routes and pass in our app and fully configured passport

var port = process.env.PORT || 3000;
server.listen(port,'10.30.8.231', function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})
 
if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })
