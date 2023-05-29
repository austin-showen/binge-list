const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Binge List' })
})

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

module.exports = router
