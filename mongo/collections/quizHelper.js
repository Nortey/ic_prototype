var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var quizSchema = new Schema({
		userId: String,
		questions: [{
			question: String,
			answers: [String],
			correctAnswer: Number
		}],
	});

var Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
