const express = require("express")
const { expressjwt } = require("express-jwt")
const jwt = require('jsonwebtoken')
// const connetServer = require("./db")
const loginRouter = require('./router/login')
const userRouter = require('./router/user')
const postsRouter = require('./router/posts')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", 'pug')
app.set("views", './public')

// connetServer()

const logger = function logger(req, res, next) {
  console.log(req.url, req.protocol, req.method, req.statusCode, req.body, req.path)
  next()
}

app.use(logger)

app.use(expressjwt({ secret: 'fsdjkfsjfsdsfdc', algorithms: ['HS256'] }))

let users = { name: 'admin', password: '123456', _id: 'sdxcjdsdsdwdwdsad' }


app.post('/login', function (req, res, next) {
  if (req.body.username !== users.name || req.body.password !== users.password) {
    return res.send({
      code: 500,
      msg: '用户名或密码错误'
    })
  }
  const token = jwt.sign({ id: users._id }, 'fsdjkfsjfsdsfdc', { expiresIn: '30s' })
  res.send({
    code: 0,
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