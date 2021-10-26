if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const seeders = require('./user.json').seeders

db.once('open', () => {
  Promise.all(
    Array.from(seeders, seeder => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seeder.password, salt))
        .then(hash => User.create({
          name: seeder.name,
          email: seeder.email,
          password: hash
        }))
        .then(user => {
          const userRestaurantList = []
          Promise.all(Array.from(seeder.index, i => {
            const restaurantData = restaurantList.find(restaurant => restaurant.id === i)
            restaurantData[userId] = user._id
            userRestaurantList.push(restaurantData)
          }))
          return Restaurant.create(userRestaurantList)
        })
    }))
    .then(() => {
      console.log('Data created.')
      process.exit()
    })
    .catch(error => console.log(error))
})