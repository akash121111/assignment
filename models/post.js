const mongoose = require('mongoose');

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

		like: [ { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ],
		dislike: [ { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ],

		comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'comments' } ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
