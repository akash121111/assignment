const okta = require('@okta/okta-sdk-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const client = new okta.Client({
	orgUrl: 'https://dev-03683891.okta.com',
	token: '00TdabhZAXS0ThoBcfiRdbADRm-e8Z9j42_m3E-V58'
});

//@desc     register user
//@routes   POST /api/v1/user/registration
//@access   public
exports.registerUser = async (req, res, next) => {
	console.log('req.body');
	try {
		await client
			.createUser({
				profile: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					login: req.body.email
				},
				credentials: {
					password: {
						value: req.body.password
					}
				}
			})
			.then((data) => {
				const token = jwt.sign({ id: data.id }, 'sdajkkljdasjklklsdajklsdjlkajklsda', {
					expiresIn: '24h'
				});
				const newUser = new User();
				newUser.userId = data.id;
				newUser.save();
				res.cookie('auth', token).json({
					user: data.profile,
					token: token
				});
			})
			.catch((err) => {
				res.json({ status: 400, data: err });
			});
	} catch ({ err }) {
		res.json(err);
	}
};

//@desc     login user
//@routes   POST /api/v1/user/login
//@access   public
exports.loginUser = async (req, res, next) => {
	try {
		const axios = require('axios');

		const data = {
			username: req.body.email,
			password: req.body.password
		};

		axios
			.post('https://dev-03683891.okta.com/api/v1/authn', data)
			.then((result) => {
				res.json({ status: 200, data: result });
			})
			.catch((err) => {
				console.error(err);
			});
	} catch ({ err }) {
		res.json(err);
	}
};

//@desc     user profile
//@routes   POST /api/v1/user/profile
//@access   public
exports.profileUser = async (req, res, next) => {
	try {
		if (req.user) {
			res.json({ data: req.user, token: req.token });
		}
	} catch ({ err }) {
		res.json(err);
	}
};

//@desc     user logout
//@routes   POST /api/v1/user/logout
//@access   public
exports.logoutUser = async (req, res, next) => {
	try {
		req.logout();
		res.redirect('/');
	} catch ({ err }) {
		res.json(err);
	}
};
