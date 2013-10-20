var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var studyGuideSchema = new Schema({
		userName: String,
		name: String,
		content: String,
		comments:[String]
	});

var StudyGuide = mongoose.model('StudyGuides', studyGuideSchema);
module.exports = StudyGuide;
