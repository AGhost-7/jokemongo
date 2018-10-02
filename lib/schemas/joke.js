const mongoose = require('mongoose')

const Joke = new mongoose.Schema({
  body: String,
  counter: Number,
  // The voting is just a "na man" or "👍". Rating starts at 1
  // and will change based on the votes by an increment/decrement
  // of 1.
  rating: Number,
  category: {
    type: String,
    index: true
  }
})

Joke.statics.submit = async function(body, categoryName = 'default') {
  const category = await this.model('Category').increment(categoryName)
  await this.model('Joke').create({
    category: category.name,
    counter: category.counter,
    body: body,
    rating: 1
  })
}

Joke.statics.random = async function(category = 'default') {
  // TODO: implement actual uneven distribution.
  const minRating = Math.random() > 0.3 ? 0 : -10
  const Joke = this.model('Joke')
  const count = await Joke.where('rating')
    .gte(minRating)
    .countDocuments()
  const offset = count * Math.random()
  return Joke.findOne()
    .skip(offset)
    .limit(1)
}

module.exports = Joke
