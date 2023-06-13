const permit = (roles) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = permit;
