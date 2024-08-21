const express = require("express")
const bcrypt = require('bcryptjs')
const cors = require('cors')
const { expressjwt } = require("express-jwt")
const jwt = require('jsonwebtoken')
// const connetServer = require("./db")
const loginRouter = require('./router/login')
const userRouter = require('./router/user')
const postsRouter = require('./router/posts')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", 'pug')
app.set("views", './public')

app.use(cors())

// connetServer()

const logger = function logger(req, res, next) {
  console.log(req.url, req.protocol, req.method, req.statusCode, req.body, req.path)
  next()
}

app.use(logger)

const SECRET = process.env.SECRET
const NAME = process.env.NAME
const PASS = process.env.PASS
const PASS_HASH = process.env.PASS_HASH

app.use(expressjwt({ secret: SECRET, algorithms: ['HS256'] }), (req, res, next) => {
  console.log(req.auth)
  next()
})

let users = { name: NAME, password: PASS, _id: 'sdxcjdsdsdwdwdsad' }


app.post('/login', function (req, res, next) {
  if (req.body.username !== users.name || !bcrypt.compareSync(users.password, req.body.password)) {
    return res.send({
      code: 500,
      msg: '用户名或密码错误'
    })
  }
  const token = jwt.sign({ user_id: users._id }, SECRET, { expiresIn: '1h' })
  res.send({
    code: 200,
    msg: '登录成功',
    token
  })
})

app.get('/', (req, res) => {
  res.render('login')
})

app.use(userRouter)
app.use(loginRouter)
app.use('/posts', postsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  if (err.name == 'UnauthorizedError') {
    return res.send({
      code: 401,
      msg: '无效的Token'
    })
  }
  res.send({
    code: 500,
    msg: '系统错误'
  })
})

app.use((req, res) => {
  res.status(404).send('404 not found')
})

app.listen(8005, () => {
  console.log("express server listening on port 8005")
})