var express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    mongoose = require('mongoose');

// Config
var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use('/public', express.static(__dirname + '/public'));
app.use(app.router);

// Routes
app.get('/', routes.main);
app.post('/signIn', routes.signIn);

// Start Server
function start(){
	mongoose.connect('mongodb://localhost/ic', function(err){
		if(err) {
			console.log("Mongo connection failed. Data will not be persisted");
		}
		else{
			http.createServer(app).listen(3000);
			console.log("Express server listening on port %d in %s mode", 3000, app.settings.env);
		}
	});
}


start();