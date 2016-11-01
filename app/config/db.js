const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/follower-markov-bot')
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
  console.log('db connected')
})

module.exports = mongoose
