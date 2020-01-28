const debug = require('debug')('jokemongo')
const config = require('../../config')
const mongoose = require('mongoose')

const Joke = require('./schemas/joke')
const Vote = require('./schemas/vote')
const Category = require('./schemas/category')

mongoose.model('Category', Category)
mongoose.model('Joke', Joke)
mongoose.model('Vote', Vote)

let url = 'mongodb://'
if (config.get('db.user')) {
  url += config.get('db.user')
  if (config.get('db.password')) {
    // For some reason an extra line break is being added to the secret...
    url += ':' + config.get('db.password').trim()
  }
  url += '@'
}

url += config.get('db.host') + '/' + config.get('db.name')

// Since users are scoped to each database, we need to tell the mongodb client
// to authenticate through the `admin` database.
url += '?authSource=admin'

debug('connection url: %s', url)

mongoose
  .connect(
    url,
    config.get('db.options')
  )
  .catch(err => {
    console.error(err.message, err.stack)
    process.exit(1)
  })

module.exports = {
  submitJoke(joke) {
    return mongoose.connection.models.Joke.submit(joke)
  },
  submitVote(counter, yeaNo) {
    return mongoose.connection.models.Vote.submit(counter, yeaNo)
  },
  randomJoke() {
    return mongoose.connection.models.Joke.random()
  }
}
