// Middleware to check if the user is authenticated
const authenticateMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.json({ error: true, error_message: 'משתמש לא מאומת' });
    }
  };

module.exports = authenticateMiddleware; // Export the middleware function
