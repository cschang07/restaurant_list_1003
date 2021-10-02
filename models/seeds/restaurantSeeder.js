const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantData = require('./restaurantData')
const db = require('../../config/mongoose')

// mongoose.connect('mongodb://localhost/restaurant_list_0923', { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection


// const mongoose = require('mongoose')

// db.on('error', () => {
//   console.log('mongodb error!')
// })
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurantData.results)
  console.log('done')
})

