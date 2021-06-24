const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const dotenv = require('dotenv');
const okta = require('./okta');
const mongoose = require('mongoose');
const app = express();

const oidc = new ExpressOIDC({
	issuer: 'https://dev-03683891.okta.com/oauth2/default',
	client_id: '0oa1247p2mgU4OQxc5d7',
	appBaseUrl: 'http://localhost:6073',
	client_secret: 'Sk8XvYTX7_Tbv7cH-fBMoroptEfmdFydSZVPQcT7',
	redirect_uri: 'localhost:6073/callback',
	scope: 'openid profile'
});

//routes

const registrationRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
	'mongodb+srv://codebreaker:Akash123@cluster0.h88js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function(err) {
		if (err) console.log(err);
		console.log('database is connected');
	}
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'abkitnatimelega',
		resave: true,
		saveUninitialized: false
	})
);

app.use(oidc.router);
app.use(okta.middleware);

app.use('/register', registrationRouter);
app.get('/', (req, res) => {
	res.json('enter the world');
});

app.use('/profile', oidc.ensureAuthenticated(), profileRouter);

app.use('/api/v1/post', postRouter);

// listening port

const PORT = process.env.PORT || 6073;
app.listen(PORT, async () => {
	console.log(`app is live at ${PORT}`);
});
