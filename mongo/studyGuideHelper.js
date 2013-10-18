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

var _getGuideById = function(options){
	var def = Deferred();

	// StudyGuide.findOne({userId: options.id}, function (err, user) {
 	//  	def.resolve(user);
	// });

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
	getGuideById: _getGuideById,
	deleteAllStudyGuides: _deleteAllStudyGuides
};


// show dbs
// use test
// db.users.find()
// db.users.remove()