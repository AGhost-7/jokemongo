const Promise = require('bluebird')
const config = require('../../config')
const redis = require('redis')

// see: https://www.npmjs.com/package/redis#rediscreateclient
const client = Promise.promisifyAll(
  redis.createClient(config.get('db.options'))
)

module.exports = {
  async submitJoke(body) {
    const counter = await client.incrAsync('vote_counters')
    await client.saddAsync('jokes', JSON.stringify({ counter, body }))
    await client.setAsync('vote_counter_' + counter, 1)
    return counter
  },
  async submitVote(counter, yeaNo) {
    if (yeaNo) {
      await client.incrAsync('vote_counter_' + counter)
    } else {
      await client.decrAsync('vote_counter_' + counter)
    }
  },
  async randomJoke() {
    let attempts = 0
    let joke
    while (!joke && attempts < 10) {
      attempts++

      const random = await client.srandmemberAsync('jokes')
      if (!random) break

      joke = JSON.parse(random)
      const votes = await client.getAsync('vote_counter_' + joke.counter)

      const minRating = Math.random() > 0.3 ? 0 : -10

      if (votes < minRating) {
        joke = null
      }
    }
    return joke
  }
}
