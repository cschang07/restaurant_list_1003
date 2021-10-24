// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
//1. home page
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Restaurant.find({ userId })         // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//2. search result
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  console.log('keyword: ' + keyword)
  Restaurant.find({
    $or: [{ name: { $regex: keyword, $options: 'i' } },
    { name_en: { $regex: keyword, $options: 'i' } },
    { location: { $regex: keyword, $options: 'i' } },
    { category: { $regex: keyword, $options: 'i' } }]
  })
    .lean()
    .then(restaurant => {
      res.render('index', { restaurants: restaurant, keyword })
    })
    .catch(error => console.error(error))
})

// 3. sort function
router.post('/sort', (req, res) => {
  const sort = req.body.sort
  const sortOptions = {
    asc: { name: 'asc' },
    desc: { name: 'desc' },
    cat: { category: 'asc' },
    loc: { location: 'asc' }
  }
  console.log('sortOptions: ', sortOptions[sort])
  Restaurant.find()
    .lean()
    .sort(sortOptions[sort])
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router