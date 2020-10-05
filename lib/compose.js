
function flatten(array) {
  if (!Array.isArray(array)) return [middlewares]
  return array.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
}

module.exports = function (middlewares) {
  if (!Array.isArray(middlewares)) throw new Error('middlewares must be array')
  middlewares = flatten(middlewares)


  return function (ctx, next) {
    function depatch(i) {
      if (i <= index) throw new Error('middleware can only call one time')
      const fn = middlewares[i]
      index = i
      if (index === middlewares.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, depatch.bind(this, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    let index = -1
    return depatch(0)
  }
}