require('dotenv').config()
require('./db')

const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./config')
const { withToken } = require('./utils/helper')
const { admin, mina } = require('./api')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(withToken(["/api/admin/login", "/api/mina/login"]))

// mina
app.post('/api/mina/login', mina.login)
app.get('/api/mina/qa', mina.qa.list)
app.post('/api/mina/match', mina.qa.match)

// admin
app.post('/api/admin/login', admin.login)



app.listen(config.port, () => console.log(`sever is running on port: ${config.port}`))