const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
		comment: {
			type: String,
			posted: { type: Date, default: Date.now },
			required: true
		},
		replay: [ { type: mongoose.Schema.Types.ObjectId, ref: 'comments' } ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
