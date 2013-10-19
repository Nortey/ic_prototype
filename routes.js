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
var _sessionCheck = function(req, resp){
	if(req.session.userName != null){
		resp.json({loggedIn: true, userName: req.session.userName});
	}else{
		resp.json({loggedIn: false});
	}
}

var _signIn = function(req, resp){
	var userName = req.body.userName;
	var password = req.body.password;

	userHelper.signInUser({userName: userName, password: password}).then(function(user){
		if(user != null){
			req.session.userName = user.userName;
			resp.json({loggedIn: true, userName: user.userName});
		}else{
			resp.json({loggedIn: false});
		}
	});
}

module.exports = {
	main: _main,
	signIn: _signIn,
	sessionCheck: _sessionCheck
};
