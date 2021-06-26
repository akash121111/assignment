const Comment = require('../models/comment');
const Post = require('../models/post');

//@desc     create comment
//@routes   POST /api/v1/comment/:pid
//@access   private
exports.createComment = async (req, res, next) => {
	try {
		const newcomment = new Comment(req.body);
		newcomment.author = req.id;
		newcomment.post = req.params.pid;
		newcomment.reply = null;

		newcomment
			.save()
			.then(async (comment) => {
				//add comments id in post
				const post = await Post.findById(req.params.pid);
				let addcomment = post.comments;
				addcomment.push(comment._id);
				console.log(addcomment);
				await post.updateOne({ comments: addcomment });

				res.status(201).json({
					status: 201,
					message: 'post commment creted',
					data: comment
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: 400,
					message: err
				});
			});
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

//@desc     create comment on comment
//@routes   POST /api/v1/comment/:postid/:commentid
//@access   private
exports.createReply = async (req, res, next) => {
	try {
		const newcomment = new Comment(req.body);
		newcomment.author = req.id;
		newcomment.post = req.params.pid;

		newcomment
			.save()
			.then(async (comment) => {
				const replycomment = await Comment.findById(req.params.cid);
				let addcomment = replycomment.replay; //change replay
				addcomment.push(comment._id);
				console.log(addcomment);
				await comment.updateOne({ replay: addcomment });
				res.status(201).json({
					status: 201,
					message: 'commment reply successful',
					data: comment
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: 400,
					message: err
				});
			});
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

//@desc     edit post
//@routes   PUT /api/v1/post/
//@access   private
exports.editPost = async (req, res, next) => {
	try {
		await Post.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true })
			.then((data) => {
				res.status(202).json({
					status: '202',
					data: data,
					message: 'post succesfully update'
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					message: err
				});
			});
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

//@desc     delete comment
//@routes   DELETE /api/v1/comment/:id
//@access   private
exports.deleteComment = async (req, res, next) => {
	try {
		var id = req.params.id;
		await Comment.deleteOne({ _id: id, user: req.id })
			.then((data) => {
				res.status(202).json({
					success: true,
					message: 'comment succesfully deleted'
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					message: err
				});
			});
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};
