const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
	orgUrl: 'https://dev-03683891.okta.com',
	token: '00zO-YXHDg1gb-r9D45mt002J0aOXzwjJbdYKs6hjK'
});

const middleware = async (req, res, next) => {
	if (req.userinfo) {
		try {
			req.user = await client.getUser(req.userinfo.sub);
		} catch (error) {
			console.log(error);
		}
	}

	next();
};

module.exports = { client, middleware };
