function isEmpty(obj) {
    return Object.keys(obj).length === 0
  }
  
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }
  
function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
  }
  
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
  }
  
function isBoolean(obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]'
  }
  
function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  }
  
function isClass(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]' && obj.toString().startsWith('class {')
  }
  
function isUndefined(obj) {
    return Object.prototype.toString.call(obj) === '[object Undefined]'
  }
  
function isNull(obj) {
    return Object.prototype.toString.call(obj) === '[object Null]'
  }
  
function parseObject(obj, defaults = {}) {
    if (isObject(obj)) {
      return obj
    }
  
    return defaults
  }
  
function parseArray(obj, defaults = []) {
    if (isArray(obj)) {
      return obj
    }
  
    return defaults
  }

module.exports = {
    isEmpty, isObject, isArray, isBoolean, isString, isNumber, isFunction, isClass, isUndefined, isNull, parseArray, parseObject,
}