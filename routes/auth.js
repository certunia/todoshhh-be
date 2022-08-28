const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const UserItem = require('../models/user')

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    res.status(301).redirect(process.env.FRONTEND_URL)
  }
)

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/me', ensureAuth,  (req, res) => {
  res.json(req.user);
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', function(req, res){
  req.logout();
  res.json({ message: 'you successfully logged out' });
});

// @desc    Logout user
// @route   /auth/logout
router.get('/logout2', function(req, res){
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
});

module.exports = router
