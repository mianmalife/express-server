const express = require("express")
const connetServer = require("./db")
const loginRouter = require('./router/login')
const userRouter = require('./router/user')
const postsRouter = require('./router/posts')
const path = require("path")
const pug = require('pug')
const session = require("express-session")
const hash = require("pbkdf2-password")()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", 'pug')
app.set("views", './public')

app.use(session({
  secret: 'yzbzzsasiki',
  saveUninitialized: false,
  resave: false
}))

connetServer()

const logger = function logger(req, res, next) {
  console.log(req.url, req.protocol, req.method, req.statusCode, req.body, req.path)
  next()
}

app.use(logger)

function isAuth(req, res, next) {
  if (req.session.user) next()
  else next('route')
}

let users = {
  ky: { name: 'admin' }
}

hash({ password: '123' }, function (err, pass, salt, hash) {
  if (err) throw err
  users.ky.salt = salt
  users.ky.hash = hash
})

function auth(name, pass, fn) {
  const user = users[name]
  if (!user) {
    return fn(null, null)
  }
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err)
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  })
}

app.post('/login', function (req, res, next) {
  auth(req.body.username, req.body.password, function (err, user) {
    req.session.error = ''
    if (err) return next(err)
    if (user) {
      req.session.regenerate(function () {
        req.session.user = user.name
        // req.session.save(err => {
        //   if (err) return next(err)
        //   res.redirect('/')
        // })
        res.redirect('/')
      })
    } else {
      req.session.error = '登录失败'
      res.render('login', { message: req.session.error || '' })
    }
  })
})

app.get('/', isAuth, (req, res) => {
  res.render('index', { message: `欢迎，${req.session.user}` })
})

app.get('/', (req, res) => {
  res.render('login')
})


app.use(userRouter)
app.use(loginRouter)
app.use('/posts', postsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('系统错误')
})

app.use((req, res) => {
  res.status(404).send('404 not found')
})

app.listen(8005, () => {
  console.log("express server listening on port 3000")
})