// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
//1. home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
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


// 匯出路由模組
module.exports = router