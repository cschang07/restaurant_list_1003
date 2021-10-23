//required packages in the project
const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

const port = 3000

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

// setting static files
// app.use(express.static('public'))

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})