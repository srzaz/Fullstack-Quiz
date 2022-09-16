const Result = require('../models/result')
const User = require('../models/user')


const initialResults = [
	{
		score: 10,
		time: 25,
		date: new Date(),
	},
	{
		score: 7,
		time: 44,
		date: new Date(),
	},
];

const nonExistingId = async() => {
    const result = new Result({ score: 5, time: 125, date: new Date()})
    await result.save()
    await result.remove()

    return result._id.toString()
}

const resultsInDB = async () => {
    const results = await Result.find({})
    return results.map(r => r.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {initialResults, resultsInDB, usersInDB, nonExistingId}

