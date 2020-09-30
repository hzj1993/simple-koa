const Emitter = require('events')
const http = require('http')
const compose = require('./compose')

class Koa extends Emitter {
  constructor () {
    super()
    this.middleware = []
  }

  createContext (req, res) {

  }

  use (middleware) {
    if (typeof middleware !== 'function') {
      console.error('middleware must be a function.')
      return
    }
    this.middleware.push(middleware)
  }

  callback () {
    const fn = compose(this.middleware)

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
    return handleRequest
  }

  handleRequest (ctx, fn) {
    const onFinish = m => {

    }
    const onError = e => {}

    return fn(ctx).then(onFinish).catch(onError)
  }

  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}