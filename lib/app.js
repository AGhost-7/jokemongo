const Koa = require('koa')
const parse = require('co-body')

const db = require('./db')

const app = new Koa()
app.context.db = db

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.type = 'text'
    ctx.body = '🔥🔥🔥🔥🔥🔥🔥\n'
    ctx.app.emit('error', err, ctx)
  }
})

app.use(async (ctx, next) => {
  if (!ctx.request.accepts('text')) {
    return ctx.throw(406, 'Why do you do this to me?')
  }
  ctx.request.body = await parse.text(ctx)
  await next()
})

require('./routes.js')(app)

app.on('error', err => {
  console.error('Error:', err.message, err.stack)
})

module.exports = app
