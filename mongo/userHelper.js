var mongoose = require('mongoose'),
	db = mongoose.connection
	User = require("./collections/user"),
	Deferred = require("JQDeferred");

var _addUsers = function(documents){
	var def = Deferred();

	db.collection('users').insert(documents, {}, function(){
		def.resolve();
	})

	return def;
}

var _getUserById = function(options){
	var def = Deferred();

	User.findOne({userId: options.id}, function (err, user) {
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
	addUsers: _addUsers,
	_getUserById: _getUserById,
	deleteAllUsers: _deleteAllUsers
};


// show dbs
// use test
// db.users.find()
// db.users.remove()