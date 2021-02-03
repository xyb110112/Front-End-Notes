/**
 * apply实现
 * @param {Object}  context    上下文
 * @param {Array}   args       参数
 */
Function.prototype.myApply = (context = window, args) => {
  context = context || window
  const key = Symbol()
  context[key] = this
  let result
  if (Array.isArray(args)) {
    result = context[key](...args)
  } else {
    result = context[key]()
  }
  delete context[key]
  return result
}
/**
 * call实现
 * @param {Object}  context    上下文
 * @param {Array}   args       参数
 */
Function.prototype.myCall = (context = window, ...args) => {
  context = context || window
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
/**
 * bind实现
 * @param {Object}  context     上下文
 * @param {Array}   args1       参数
 */
Function.prototype.myBind = (context = window, ...args1) => {
  context = context || window
  const _this = this
  return function Bind(...args2) {
    // 考虑到bind返回的函数，可能当做构造函数去new一个实例，所以这里需要判断this指向
    return _this.apply(this instanceof Bind ? this : context, [
      ...args1,
      ...args2,
    ])
  }
}
/**
 * new实现
 * @param  {Function}   ctor  构造函数
 * @param  {Array}      args  参数
 */
const _new = (ctor, ...args) => {
  const obj = Object.create(ctor.prototype)
  const result = ctor.apply(obj, args)
  return result !== null &&
    (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj
}
/**
 * instanceOf实现
 * @param {Any}     L   左侧带比较的值
 * @param {Object}  R   右侧原型
 */
const _instanceOf = (L, R) => {
  const O = R.prototype
  L = Object.getPrototypeOf(L)
  while (true) {
    if (L === null) {
      return false
    }
    if (L === O) {
      return true
    }
    L = Object.getPrototypeOf(L)
  }
}
/**
 * 深拷贝
 * @param {Any}     origin    原始值
 * @param {Object}  cache     缓存
 */
const cloneDeep = (origin, cache = new WeakMap()) => {
  if (origin === null || typeof origin !== 'object') {
    return origin
  }
  if (cache.get(origin)) {
    return cache.get(origin)
  }
  const target = Array.isArray(origin) ? [] : {}
  cache.set(origin, target)
  const keys = Object.keys(origin).concat(Object.getOwnPropertySymbols(origin))
  for (const key of keys) {
    target[key] = cloneDeep(origin[key], cache)
  }
  return target
}
/**
 * debounce实现
 * @param {Function}  fn      执行函数
 * @param {Number}    delay   延长时间
 */
const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * throttle实现
 * @param {Function}  fn      执行函数
 * @param {Number}    delay   延长时间
 */
const throttle = (fn, delay) => {
  let lastTime = 0
  return (...args) => {
    if (Date.now() - lastTime > delay) {
      lastTime = Date.now()
      fn.apply(this, args)
    }
  }
}
/**
 * 函数柯里化实现
 * @param {Function}  fn        待执行函数
 * @param {Number}    length    剩余参数数量
 */
const curry = (fn, length) => {
  length = length || fn.length
  return (...args) => {
    return args.length >= length
      ? fn.apply(this, args)
      : curry(fn.bind(this, ...args), length - args.length)
  }
}
/**
 * 函数compose实现
 * @param  {Array} funcs 执行函数
 */
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
