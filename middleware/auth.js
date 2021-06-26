const okta = require('@okta/okta-sdk-nodejs');
const jwt = require('jsonwebtoken');

const client = new okta.Client({
	orgUrl: 'https://dev-03683891.okta.com',
	token: '00TdabhZAXS0ThoBcfiRdbADRm-e8Z9j42_m3E-V58'
});

const isUser = async (req, res, next) => {
	let token = req.header('auth');
	if (token) {
		try {
			let decoded = jwt.verify(token, 'sdajkkljdasjklklsdajklsdjlkajklsda');

			req.user = await client.getUser(decoded.id);
			req.id = decoded.id;
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(401).json({ status: 401, message: 'Unauthorized access' });
	}

	next();
};

module.exports = { client, isUser };
