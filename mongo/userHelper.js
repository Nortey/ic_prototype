var mongoose = require('mongoose'),
	db = mongoose.connection
	User = require("./collections/user"),
	Deferred = require("JQDeferred");

var _signInUser = function(user){
	var def = Deferred();

	User.findOne({userName: user.userName, password: user.password}, function(err, user){
		if(err) console.log(err);
		def.resolve(user);
	});

	return def;
}

var _addUser = function(user){
	var def = Deferred();

	db.collection('users').insert(user, {}, function(){
		def.resolve();
	})

	return def;
}

var _getUserByUserName = function(options){
	var def = Deferred();

	User.findOne({userName: options.userName}, function (err, user) {
  		def.resolve(user);
	});

	return def;
}

var _deleteAllUsers = function(){
	var def = Deferred();
	
	User.remove({}, function(err) { 
   		def.resolve();
	});

	return def;
}

module.exports = {
	signInUser: _signInUser,
	addUser: _addUser,
	getUserByUserName: _getUserByUserName
};


// show dbs
// use test
// db.users.find()
// db.users.remove()