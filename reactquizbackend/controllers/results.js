const resultsRouter = require('express').Router();
const Result = require('../models/result');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

resultsRouter.get('/', async (request, response) => {
	const results = await Result.find({}).populate('user', {username: 1, name: 1});
	response.json(results);
});

resultsRouter.get('/:id', async (request, response) => {
	const result = await Result.findById(request.params.id);
	if (result) {
		response.json(result);
	} else {
		response.status(404).end();
	}
});

resultsRouter.post('/', async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	
    const user = await User.findById(decodedToken.id);
	const result = new Result({score: body.score, time: body.time, date: new Date(), user: user._id });
	const savedResult = await result.save();
	user.results = user.results.concat(savedResult._id);
    await user.save()
	response.status(201).json(savedResult);
});

module.exports = resultsRouter;
