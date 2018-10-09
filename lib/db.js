const config = require('./config')
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
    url += ':' + config.get('db.password')
  }
  url += '@'
}

url += config.get('db.host') + '/' + config.get('db.name')

mongoose
  .connect(
    url,
    config.get('db.options')
  )
  .catch(err => {
    console.error(err.message, err.stack)
    process.exit(1)
  })

module.exports = mongoose.connection
