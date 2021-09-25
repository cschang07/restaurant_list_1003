const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
mongoose.connect('mongodb://localhost/restaurant_list_0923', { useNewUrlParser: true, useUnifiedTopology: true })
const restaurantData = require('./restaurantData')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurantData.results)
  console.log('done')
})

