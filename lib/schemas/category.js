const mongoose = require('mongoose')

const Category = new mongoose.Schema({
  name: {
    type: String,
    default: 'default',
    index: true
  },
  counter: {
    type: Number,
    default: 1,
    index: true
  }
})

// apparently this is atomic so ¯\_(ツ)_/¯
Category.statics.increment = function(name = 'default') {
  return this.model('Category').findOneAndUpdate({
    name: name
  }, {
    $inc: {
      counter: 1
    }
  }, {
    upsert: true,
    setDefaultsOnInsert: true,
    new: true
  })
}

module.exports = Category
