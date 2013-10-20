var mongoose = require('mongoose'),
	db = mongoose.connection
	User = require("./collections/user"),
	Deferred = require("JQDeferred"),
	StudyGuide = require("./collections/studyGuide");

var _addStudyGuide = function(documents){
	var def = Deferred();

	db.collection('studyguides').insert(documents, {}, function(){
		def.resolve();
	})

	return def;
}

var _getStudyGuidesByUserName = function(options){
	var def = Deferred();

	StudyGuide.find({userName: options.userName}, { name: 1 }, function (err, user) {
 	 	def.resolve(user);
	});

	return def;
}

var _deleteAllStudyGuides = function(){
	var def = Deferred();
	
	StudyGuide.remove({}, function(err) { 
   		def.resolve();
	});

	return def;
}

module.exports = {
	addStudyGuide: _addStudyGuide,
	deleteAllStudyGuides: _deleteAllStudyGuides,
	getStudyGuidesByUserName: _getStudyGuidesByUserName
};


// show dbs
// use test
// db.users.find()
// db.users.remove()