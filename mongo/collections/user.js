var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var userSchema = new Schema({
		userName: String,
		password: String,
		quizzes: [
			{quizName: String, quizId: String}
		],
		studyGuides: [
			{ guideName: String, guideId: String }
		],
		profile:{
			education: String,
			emailAddress: String,
			bio: String
		},
		badges: [Number]
	});

var User = mongoose.model('Users', userSchema);
module.exports = User;
