const config = require('./config')
const mongoose = require('mongoose')

const Joke = require('./schemas/joke')
const Vote = require('./schemas/vote')
const Category = require('./schemas/category')

mongoose.model('Category', Category)
mongoose.model('Joke', Joke)
mongoose.model('Vote', Vote)

mongoose
  .connect(
    config.get('db.url'),
    config.get('db.options')
  )
  .catch(err => {
    console.error(err.message, err.stack)
    process.exit(1)
  })

module.exports = mongoose.connection
