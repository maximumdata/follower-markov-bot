const client = require('./config/twitter')
const tweet = require('./models/tweet')
const MarkovGen = require('markov-generator')

let saveTweetsFromFollowers = (cb) => {
  client.get('followers/ids', (error, followers, response) => {
    if (error) throw error
    followers.ids.forEach((e, i, a) => {
      client.get('statuses/user_timeline', {user_id: e, count: 200, exclude_replies: true, include_rts: false}, (error, timeline, response) => {
        if (error) throw error

        timeline.forEach((el, it, ar) => {
          let newTweet = new tweet({
            user_id: e,
            content: el.text,
            tweet_id: el.id
          })
          tweet.find({tweet_id: el.id}, (err, found) => {
            if (err) {
              throw err
            }
            if (!found.length) {
              newTweet.save((err, saved) => {
                if (err) throw err
                console.log('saved', saved)
              })
            }
          })
        })
      })
    })
  })
  tweet.find({}, (err, tweets) => {
    if (err) {
      throw err
    }
    cb(tweets)
  })
}

let generateTweet = (cb) => {
  tweet.find({}, (err, tweets) => {
    if (err) {
      throw err
    }
    let array = []
    tweets.forEach((e) => {
      array.push(e.content)
    })
    let markov = new MarkovGen({
      input: array,
      minLength: 10
    })

    let sentence = markov.makeChain()
    while (sentence.length > 140) {
      sentence = markov.makeChain()
    }

    cb(sentence)
  })
}

let postTweet = (cb) => {
  generateTweet((genTweet) => {
    client.post('statuses/update', {status: genTweet}, function (error, tweet, response) {
      if (error) throw error
      if (cb) {
        cb()
      } else {
        console.log(tweet)
      }
    })
  })
}

module.exports = {
  save: saveTweetsFromFollowers,
  generate: generateTweet,
  post: postTweet
}
