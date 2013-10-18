var mongoose = require('mongoose'),
	db = mongoose.connection
	Quiz = require("./collections/quiz"),
	Deferred = require("JQDeferred");

var _addQuiz = function(documents){
	var def = Deferred();

	db.collection('quizs').insert(documents, {}, function(){
		def.resolve();
	})

	return def;
}

var _getQuizById = function(options){
	var def = Deferred();

	Quiz.findOne({userId: options.id}, function (err, user) {
  		def.resolve(user);
	});

	return def;
}

var _deleteAllQuizzes = function(){
	var def = Deferred();
	
	Quiz.remove({}, function(err) { 
   		def.resolve();
	});

	return def;
}

module.exports = {
	addQuiz: _addQuiz,
	getQuizById: _getQuizById,
	deleteAllQuizzes: _deleteAllQuizzes
};


// show dbs
// use test
// db.users.find()
// db.users.remove()