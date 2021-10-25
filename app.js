//required packages in the project
const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// const port = 3000

const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

// setting static files
// app.use(express.static('public'))

//start and listen on the Express server
app.listen(process.env.PORT, () => {
  console.log(`Express is listening on localhost:${process.env.PORT}`)
})