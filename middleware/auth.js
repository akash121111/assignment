const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
	orgUrl: 'https://dev-03683891.okta.com',
	token: '00TdabhZAXS0ThoBcfiRdbADRm-e8Z9j42_m3E-V58'
});

const isUser = async (req, res, next) => {
	let token = req.header('auth');
	if (token) {
		try {
			req.user = await client.getUser(token);
			req.token = token;
		} catch (error) {
			console.log(error);
		}
	}

	next();
};

module.exports = { client, isUser };
