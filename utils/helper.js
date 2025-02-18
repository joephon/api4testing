const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')
const R = require('./response')
const DB = require('../models')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

function sha1(str) {
  const md5sum = crypto.createHash('sha1')
  md5sum.update(str);
  const ciphertext = md5sum.digest('hex')
  return ciphertext;
};

async function addSalt(str, salt) {
  try {
    if (!salt) {
      const buf = await promisify(crypto.randomBytes)(32)
      salt = buf.toString('hex')
    }
    const encrypt = sha1(str + salt + process.env.JWT_SALT)
    return { encrypt, salt }
  } catch (error) {
    console.log(error)
    return null
  }
}

async function createPwd(str) {
  const { encrypt, salt } = await addSalt(str)
  return encrypt + salt
}

async function verifyPwd(str, salt, pwd) {
  const { encrypt, salt: ooxx } = await addSalt(str, salt)
  return encrypt + ooxx === pwd
}

async function signJwt({ _id, expiresIn = 60 * 60 * 24 * 15 * 1000 }) {
  const accessToken = await sign({ data: _id }, process.env.JWT_SALT, { expiresIn });
  return accessToken;
}

async function decodeJwt(authorization) {
  try {
    const decoded = await verify(authorization, process.env.JWT_SALT)
    return decoded
  } catch (error) {
    return null
  }
}

function withToken(excludes = []) {  // /api/admin/login", "/api/mina/login"]
  return async (req, res, next) => {
    if (excludes.includes(req.url)) {
        return next()
    }
    const accessToken = req.headers['authorization']
    const decoded = await decodeJwt(accessToken)

    if (!decoded) {
        return res.json(R.deny('ACCESS TOKEN INVALID'))
    }

    const [_, which, user] = req.url.split('/').filter(i => !!i)
    
    let Model
    if (which === 'admin') Model = DB.Admin
    if (which === 'mina') Model = DB.User
    
    const { data:  [currentUser]} = await Model.where({_id: decoded.data}).get()
    if (!currentUser) {
        return res.json(R.deny('ACEESS TOKEN INVALID'))
    }

    req.decoded = decoded
    req.currentUser = currentUser

    next()
  }
}

module.exports = {
    createPwd, verifyPwd, signJwt, withToken,
}