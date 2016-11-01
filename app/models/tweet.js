const mongoose = require('../config/db')

const schema = mongoose.Schema({
  user_id: String,
  content: String,
  tweet_id: String
})

let tweet = mongoose.model('tweet', schema)

// schema.pre('save', function (next) {
//   var self = this
//   tweet.find({tweet_id: self.tweet_id}, function (err, docs) {
//     if (err) return err
//     if (!docs.length) {
//       next()
//     } else {
//       console.log('tweet exists: ', self.tweet_id)
//       next(new Error('tweet exists'))
//     }
//   })
// })

module.exports = tweet
