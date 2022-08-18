const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const TodoItem = require('../models/todo_item')

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(301, process.env.FRONTEND_URL)
  }
)

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/me', ensureAuth,  (req, res) => {
    res.json(req.user);
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
