const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantData = require('./restaurantData')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurantData.results)
  console.log('done')
})

