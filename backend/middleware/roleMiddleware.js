// middleware/roleMiddleware.js
export const allowRoles = (...allowedTypes) => {
  return (req, res, next) => {
    // req.user.type is set by authMiddleware
    if (!req.user || !allowedTypes.includes(req.user.type)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};
