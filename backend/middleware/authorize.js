const User = require('../models/User');

const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).select('role email name');

      if (!user) {
        return res.status(401).json({ message: 'User not found for this token' });
      }

      req.user = {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions for this action' });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ message: 'Authorization failed', error: error.message });
    }
  };
};

module.exports = authorize;
