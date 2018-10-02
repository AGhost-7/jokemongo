const mongoose = require('mongoose')

const Vote = module.exports = new mongoose.Schema({
  joke: {
    index: true,
    type: mongoose.Schema.Types.ObjectId
  },
  rating: Boolean
})

Vote.statics.submit = async function(counter, rating, category = 'default') {
  const joke = await this.model('Joke').find({
    counter,
    category
  })
  if (joke) {
    const vote = await this.model('Vote').create({
      joke: joke._id,
      rating
    })

    try {
      await this.model('Joke').findOneAndUpdate({
        _id: joke._id
      }, {
        $inc: {
          rating: rating ? 1 : -1
        }
      })
    } catch (err) {
      // undo the change if it fails
      await vote.remove()
      throw new Error('Failed to update joke rating')
    }

    return vote
  }
}
