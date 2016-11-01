const schedule = require('node-schedule')
const logic = require('./logic')

let postRule = new schedule.RecurrenceRule()
postRule.minute = 15

schedule.scheduleJob(postRule, function () {
  logic.post(() => {
    console.log('posted at ' + Date.now())
  })
})

let updateRule = new schedule.RecurrenceRule()
updateRule.minute = 1

schedule.scheduleJob(updateRule, () => {
  logic.save((tweets) => {
    console.log('tweets.length after save ', tweets.length)
  })
})
