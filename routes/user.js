const okta = require('@okta/okta-sdk-nodejs');
const express = require('express');
const dotenv = require('dotenv');

const router = express.Router();

const client = new okta.Client({
	orgUrl: 'https://dev-03683891.okta.com',
	token: '00zO-YXHDg1gb-r9D45mt002J0aOXzwjJbdYKs6hjK'
});

router.get('/', (req, res, next) => {
	if (req.userinfo) {
		res.json('you are already login');
	}

	res.json('go to login');
});

router.post('/', async (req, res, next) => {
	console.log(req.body);
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
				res.json({ status: 200, data: data });
			})
			.catch((err) => {
				res.json({ status: 400, data: err });
			});
	} catch ({ err }) {
		res.json(err);
	}
});

module.exports = router;
