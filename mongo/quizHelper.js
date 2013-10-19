var mongoose = require('mongoose'),
	db = mongoose.connection
	Quiz = require("./collections/quiz"),
	Deferred = require("JQDeferred");

var _createQuiz = function(documents){
	var def = Deferred();

	db.collection('quizzes').insert(documents, {}, function(){
		def.resolve();
	})

	return def;
}

var _getQuizzesByUserName = function(options){
	var def = Deferred();

	Quiz.find({userName: options.userName}, { quizName: 1 }, function (err, quizzes) {
  		def.resolve(quizzes);
	});

	return def;
}

var _getAllQuizzes = function(options){
	var def = Deferred();

	Quiz.find({}, function (err, quizzes) {
  		def.resolve(quizzes);
	});

	return def;
}

var _addQuestion = function(options){
	var userName = options.userName;
	var questionObj = options.question;
	var quizName = questionObj.quizName;

	var question = {
		question: questionObj.question,
		answers: questionObj.answers
	}

	db.collection('quizzes').update( 
		{ userName: userName, quizName: quizName}, 
		{ $push: {questions: question} },
		function(err){
			if(err) console.log(err);	
		} 
	);
}

var _deleteAllQuizzes = function(){
	var def = Deferred();
	
	Quiz.remove({}, function(err) { 
   		def.resolve();
	});

	return def;
}

module.exports = {
	createQuiz: _createQuiz,
	getQuizzesByUserName: _getQuizzesByUserName,
	deleteAllQuizzes: _deleteAllQuizzes,
	addQuestion: _addQuestion,
	getAllQuizzes: _getAllQuizzes
};


// show dbs
// use test
// db.users.find()
// db.users.remove()