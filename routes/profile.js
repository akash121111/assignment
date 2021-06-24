const express = require('express');
const router = express.Router();

router.post('/update', async (req, res, next) => {
	try {
		Object.assign(req.user.profile, req.body);

		await req.user.update();
	} catch (error) {
		console.log(error);
	}

	next();
});

router.use('/', (req, res, next) => {
	res.json({ profile: 'profile', data: req.user });
});

module.exports = router;
