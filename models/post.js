const mongoose = require('mongoose');
const Comment = require('./comment');
const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [ true, 'please provide post title' ]
		},

		description: {
			type: String,
			required: [ true, 'please provide post title' ]
		},

		like: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } ],
		dislike: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } ],

		comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
		author: { type: String, ref: 'users' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
