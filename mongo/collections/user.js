var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var userSchema = new Schema({
		userId: String,
		studyGuides: [ObjectId]
	});

var User = mongoose.model('User', userSchema);
module.exports = User;
