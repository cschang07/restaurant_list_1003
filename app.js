//required packages in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000

const routes = require('./routes')
require('./config/mongoose')

const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// setting static files
app.use(express.static('public'))

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

// const mongoose = require('mongoose') // 載入 mongoose

// //connect to Database
// mongoose.connect('mongodb://localhost/restaurant_list_0923', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// // 取得資料庫連線狀態
// const db = mongoose.connection
// // 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })