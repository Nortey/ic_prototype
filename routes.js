var fs = require("fs"),
	Deferred = require("JQDeferred"),
	userHelper = require("./mongo/userHelper");

/**************************************************************
					MAIN PAGE
***************************************************************/

var _main = function(req, resp){
	fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        resp.send(text);
    });
}

/**********************************************************************************
	Sign In
	curl -i -X GET http://localhost:3000/signIn
***********************************************************************************/
var _signIn = function(req, resp){
	var userName = req.body.userName;
	var password = req.body.password;

	userHelper.signInUser({userName: userName, password: password}).then(function(user){
		if(user != null){
			req.session.userName = user.userName;
			resp.send(200);
		}else{
			resp.send(401);
		}
	});
}

module.exports = {
	main: _main,
	signIn: _signIn
};
