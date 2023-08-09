const express = require('express');
const passport = require('passport');
const router = express.Router();
const mappings = require('../mappings.cjs');
  
  // POST /api/login - User login
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.json({ error: true, error_message: mappings.SERVER_ERROR(err.message)});
      }
      if (!user) {
        return res.json({ error: true, error_message: mappings.INVALID_CREDENTIALS });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json({ error: true, error_message: mappings.SERVER_ERROR(err.message)});
        }
  
        return res.json({ error: false, message: mappings.SUCCESSFULL_SIGN_IN, user, sessionExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
      });
    })(req, res, next);
  });
  
  // GET /api/isLoggedIn - Check if the user is logged in
  router.get('/isLoggedIn', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ error: false, user: req.user });
    } else {
      res.json({ error: false, user: null });
    }
  });
  
  // GET /api/logout - User logout
  router.get('/logout', (req, res) => {
    // Call req.logout() to log out the current user
    req.logout((err) => {
      if (err) {
        return res.json({ error: true, error_message: mappings.LOGOUT_ERROR(err.message) });
      }
  
      // Destroy the session on the server-side
      req.session.destroy((err) => {
        if (err) {
          return res.json({ error: true, error_message: mappings.LOGOUT_ERROR(err.message) });
        }
  
        // Clear the session cookie on the client-side
        res.clearCookie('connect.sid');
        return res.json({ error: false, result: mappings.SUCCESSFULL_LOG_OUT });
      });
    });
  });
  
  module.exports = router;