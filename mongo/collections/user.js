var mongoose = require('mongoose'),
  	Schema = mongoose.Schema,
  	ObjectId = mongoose.SchemaTypes.ObjectId;

var userSchema = new Schema({
		userName: String,
		password: String,
		studyGuides: [ObjectId]
	});

var User = mongoose.model('User', userSchema);
module.exports = User;
