var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var studyGuideSchema = new Schema({
		content: String,
		comments:[String]
	});

var StudyGuide = mongoose.model('StudyGuides', studyGuideSchema);
module.exports = StudyGuide;
