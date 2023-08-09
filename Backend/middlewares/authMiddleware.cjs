// check if the user is authenticated
const mappings = require('../mappings.cjs');

const authenticateMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({ error: true, error_message: mappings.UNAUTHENTICATED });
  }
};

// check if the user is manager
const managerMiddleware = (req, res, next) => {
  if (req.user.isManager) {
    return next();
  } else {
    return res.json({ error: true, error_message: mappings.NOTMANAGER });
  }
};



module.exports = {authenticateMiddleware, managerMiddleware}; // Export the middleware function
