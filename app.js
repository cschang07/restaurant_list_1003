//required packages in the project
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride= require('method-override')

const port = 3000

const Restaurant = require('./models/restaurant') // 載入 Restaurant model

const routes = require('./routes')
const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))



//connect to Database
mongoose.connect('mongodb://localhost/restaurant_list_0923', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(methodOverride('_method'))

app.use(routes)

// setting static files
app.use(express.static('public'))

//routes setting
//index.handlebars
// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

//new.handlebars
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  // console.log(req.body)
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show.handlebars
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit.handlebars
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})