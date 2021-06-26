const jwt = require('jsonwebtoken');
const Post = require('../models/post');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	userId: {
		type: String
	},
	post: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ]
});

// generate token

userSchema.methods.generateToken = function(cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), confiq.SECRET);

	user.token = token;
	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};
module.exports = mongoose.model('User', userSchema);
