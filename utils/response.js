const S = require('string')

// 0 ok
// -1 miss
// -2 invalid
// -3 exists
// -4 _404
// -5 deny
// -999 error

function ok(data = {}) {
  return {
    errMsg: `SUCCESS`,
    code: 0,
    data
  }
}

function miss(param) {
  return {
    errMsg: `MISSING_PARAM_${S(param).underscore().s.toUpperCase()}`,
    code: -1
  }
}

function invalid(param) {
  return {
    errMsg: `INVALID_PARAM_${S(param).underscore().s.toUpperCase()}`,
    code: -2
  }
}

function exists(msg) {
  return {
    errMsg: `DATA_EXISTS_${S(msg).underscore().s.toUpperCase()}`,
    code: -3
  }
}

function _404(msg) {
  return {
    errMsg: `DATA_NOT_FOUND_${S(msg).underscore().s.toUpperCase()}`,
    code: -4
  }
}

function deny(msg) {
  return {
    errMsg: `PERMITION_DENY_${S(msg).underscore().s.toUpperCase()}`,
    code: -5
  }
}

function error(msg = 'SERVER') {
  return {
    errMsg: `ERROR_${S(msg).underscore().s.toUpperCase()}`,
    code: -999
  }
}

module.exports = {
    ok, miss, invalid, exists, _404, deny, error,
}