if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const user = require('../user')


const password = '12345678'



return bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(hash => {
    return [{
      name: 'user1',
      email: 'user1@example.com',
      password: hash,
      index: [1, 2, 3]
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: hash,
      index: [4, 5, 6]
    }]
  })
  .then(userSeed => {
    db.once('open', () => {
      User
        .create(userSeed)
        .then((user) => {
          const [{ _id: user1_id }, { _id: user2_id }] = user
          return Promise.all(restaurantList.map((item, index) => {
            if (index < 3) {
              return Restaurant.create(Object.assign(item, { userId: user1_id }))
            } else if (index > 3 && index < 7) {
              return Restaurant.create(Object.assign(item, { userId: user2_id }))
            }
          }))
        })
        .finally(() => {
          console.log('Data created.')
          process.exit()
        })
        .catch(err => console.log(err))
    })
  })


