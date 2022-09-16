const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Result = require('../models/result');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
beforeEach(async () => {
	await User.deleteMany({});
	await Result.deleteMany({});
	const passwordHash = await bcrypt.hash('secret', 10);
	const user = new User({ username: 'root', name: 'steve', passwordHash });
	await user.save();

	for (let result of helper.initialResults) {
		let resultObj = new Result(result);
		await resultObj.save();
	}
});
describe('results tests', () => {
	test('results are returned as json', async () => {
		await api
			.get('/api/results')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('all results are returned', async () => {
		const response = await api.get('/api/results');

		expect(response.body).toHaveLength(helper.initialResults.length);
	});

	test('specific result is returned', async () => {
		const response = await api.get('/api/results');

		const scoresAndTimes = response.body.map((r) => (r.score, r.time));
		expect(scoresAndTimes).toContain((10, 25));
	});
});
test('succeeds with a valid ID', async () => {
	const resultsAtStart = await helper.resultsInDB();
	const resultToView = resultsAtStart[0];

	const viewedResult = await api
		.get(`/api/results/${resultToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const processedResult = JSON.parse(JSON.stringify(resultToView));

	expect(viewedResult.body).toEqual(processedResult);
});

test('fails with an invalid ID', async () => {
	const validNonexistingId = await helper.nonExistingId();

	console.log(validNonexistingId);

	await api.get(`/api/results/${validNonexistingId}`).expect(404);
});

const getJwtToken = async () => {
	const testUserCreds = { username: 'root', password: 'secret' };
	const userLogin = await api
		.post('/api/login')
		.send(testUserCreds)
		.expect(200);
	return userLogin.body.token;
};
describe('result creation', () => {
	test('succeeds with valid data', async () => {
		const newResult = {
			score: 6,
			time: 50,
		};

		await api
			.post('/api/results')
			.send(newResult)
			.set('Authorization', `bearer ${await getJwtToken()}`)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const resultsAtEnd = await helper.resultsInDB();
		expect(resultsAtEnd).toHaveLength(helper.initialResults.length + 1);

		const scoresAndTimes = resultsAtEnd.map((r) => (r.score, r.time));
		expect(scoresAndTimes).toContain((6, 50));
	});

	test('fails with status code 400 if data invaild', async () => {
		const newResult = {
			score: 5,
		};

		await api
			.post('/api/results')
			.send(newResult)
			.set('Authorization', `bearer ${await getJwtToken()}`)
			.expect(400);

		const resultsAtEnd = await helper.resultsInDB();

		expect(resultsAtEnd).toHaveLength(helper.initialResults.length);
	});
});
test('can create new user', async () => {
	const usersBefore = await api.get('/api/users')
	
	const username = 'tester';
	const password = 'nodejsfsopen';
	const name = 'Testing';

	await api.post('/api/users').send({ username, name, password }).expect(201);

	const usersAfter = await helper.usersInDB();
	expect(usersAfter).toHaveLength(usersBefore.length + 1);

	const usernames = usersAfter.map((u) => u.username);
	expect(usernames).toContain(newUser.username);
});

afterAll(() => {
	mongoose.connection.close();
});
