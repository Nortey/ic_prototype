var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var quizSchema = new Schema({
		userName: String,
		quizName: String,
		questions: [
			{ question: String, answers: [String], correctAnswer: Number }
		],
		vote_count: Number,
		votes:[String]
	});

var Quiz = mongoose.model('Quizzes', quizSchema);
module.exports = Quiz;
