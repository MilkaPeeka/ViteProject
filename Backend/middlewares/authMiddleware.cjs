// check if the user is authenticated
const authenticateMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({ error: true, error_message: 'משתמש לא מאומת' });
  }
};

// check if the user is manager
const managerMiddlewate = (req, res, next) => {
  if (req.user.isManager) {
    return next();
  } else {
    return res.json({ error: true, error_message: 'משתמש לא מנהל לכן אין לו הרשאה לבצע פעולה' });
  }
};



module.exports = {authenticateMiddleware, managerMiddlewate}; // Export the middleware function
