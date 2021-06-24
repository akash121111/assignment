const post = require('../models/post');
const Post = require('../models/post');

//@desc     get post
//@routes   get /api/v1/post/
//@access   private
exports.getAllPost = async (req, res, next) => {
	try {
		let query;

		//copy queryStr to queryReq

		const queryReq = { ...req.query };

		console.log(req.query);

		//field to remove

		const removeField = [ 'select', 'sort', 'limit', 'page' ];

		//loop removefields to deleted

		removeField.forEach((params) => delete queryReq[params]);

		//create query string
		let queryStr = JSON.stringify(queryReq);

		//crete operaters like gt,gte,lt,lte and in

		queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

		//finding resource

		query = Post.find(JSON.parse(queryStr));

		//sort
		if (req.query.sort) {
			const fields = req.query.sort.split(',').join(' ');
			query = query.sort(fields);
		} else {
			query = query.sort('-createdAt');
		}

		//pagination

		const page = parseInt(req.query.page, 10) || 1;

		const limit = parseInt(req.query.limit, 10) || 25;

		const startIndex = (page - 1) * limit;

		const endIndex = page * limit;

		const total = await post.countDocuments();

		query = query.skip(startIndex).limit(limit);
		//pagination query

		const pagination = {};

		if (endIndex < total) {
			pagination.next = {
				page: page + 1,
				limit
			};
		}

		if (startIndex > 0) {
			pagination.prev = {
				page: page - 1,
				limit
			};
		}

		const result = await query;

		res.json({
			success: true,
			count: result.length,
			pagination,
			data: result
		});
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

//@desc     create post
//@routes   POST /api/v1/post/
//@access   private
exports.createPost = async (req, res, next) => {
	try {
		const newspost = new Post(req.body);

		newspost
			.save()
			.then((post) => {
				res.status(201).json({
					status: 201,
					message: 'post sucessfully creted',
					data: post
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

//@desc     delete post
//@routes   DELETE /api/v1/post/
//@access   private
exports.deletePost = async (req, res, next) => {
	try {
		var id = req.params.id;
		await Post.deleteOne({ _id: id })
			.then((data) => {
				res.status(202).json({
					success: true,
					message: 'post succesfully deleted'
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
