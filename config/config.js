const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URL
	},
	default: {
		SECRET: 'mysecretkey',
		DATABASE:
			'mongodb+srv://codebreaker:Akash123@cluster0.h88js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};
