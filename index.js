const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const okta = require('./okta');

const mongoose = require('mongoose');
const app = express();

app.use(
	session({
		secret: 'abkitnatimelega',
		resave: true,
		saveUninitialized: false
	})
);

const { ExpressOIDC } = require('@okta/oidc-middleware');
const oidc = new ExpressOIDC({
	appBaseUrl: 'http://localhost:3000',
	issuer: 'https://dev-03683891.okta.com/oauth2/default',
	client_id: '0oa12wlztjDcXuGKY5d7',
	client_secret: 'TJWBCtOMU_wP-JunBE938D_zzzEoeGCQOFxVjtsA',
	redirect_uri: 'http://localhost:3000/callback',
	scope: 'openid profile',
	routes: {
		loginCallback: {
			path: '/callback'
		}
	}
});

//routes

app.use(oidc.router);
app.use(okta.middleware);

const registrationRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/user', registrationRouter);
app.get('/', (req, res) => {
	res.json('enter the world');
});

app.use('/profile', oidc.ensureAuthenticated(), profileRouter);

app.use('/api/v1/post', postRouter);

app.use('/api/v1/comment', commentRouter);

// listening port

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
	console.log(`app is live at ${PORT}`);
});

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
