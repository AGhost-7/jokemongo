/**
 * All this will do is allow me to determine if the app is hung up for now. For
 * example, if there's a ReDoS issue Kubernetes will restart the application
 * automatically.
 */

const route = require('koa-route')
const Koa = require('koa')

const app = new Koa()
app.context.db = require('./db')

function getHealthz(ctx) {
  ctx.status = 200
}

app.use(route.get('/healthz', getHealthz))

module.exports = app
