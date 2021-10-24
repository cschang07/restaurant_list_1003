const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    console.log(errors)
    errors.push({ message: 'All fields are required' })
  }
  if (password !== confirmPassword) {
    console.log(errors)
    errors.push({ message: 'Confirm password does not correspond to password.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      console.log(errors)
      errors.push({ message: 'This email has been registered.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})


router.get('/logout', (req, res) => {
  req.logout() //.logout() is provided by Passport
  req.flash('success_msg', 'Log out successfully.')
  res.redirect('/users/login')
})

module.exports = router