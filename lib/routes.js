const route = require('koa-route')

async function getJoke(ctx, next) {
  const joke = await ctx.db.models.Joke.random()
  if (!joke) {
    ctx.body = `Ain't got no jokes.\n`
    ctx.status = 404
  } else {
    ctx.body = `${joke.counter}: ${joke.body}\n`
  }
}

async function postJoke(ctx) {
  await ctx.db.models.Joke.submit(ctx.request.body)
  ctx.status = 204
  ctx.body = ''
}

async function upvote(ctx, counter) {
  const vote = await ctx.db.models.Vote.submit(counter, true)
  ctx.status = vote ? 204 : 404
  ctx.body = '👍\n'
}

async function downvote(ctx, counter) {
  const vote = await ctx.db.models.Vote.submit(counter, false)
  ctx.status = vote ? 204 : 404
  ctx.body = '👎\n'
}

module.exports = app => {
  app.use(route.get('/', getJoke))
  app.use(route.post('/', postJoke))
  app.use(route.get('/joke', getJoke))
  app.use(route.post('/joke', postJoke))
  app.use(route.post('/:counter/up', upvote))
  app.use(route.post('/:counter/yeaman', upvote))
  app.use(route.post('/:counter/down', downvote))
  app.use(route.post('/:counter/naman', downvote))
}
