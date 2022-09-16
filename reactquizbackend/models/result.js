const mongoose = require('mongoose')



//schema for db
  const resultSchema = new mongoose.Schema({
    score: {type: Number, required: true},
    time: {type: Number, required: true},
    date: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })
resultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Result', resultSchema)