
module.exports = (...role) => {

  return (req, res, next) => {
    const userRole = (req.user.role || "").toString().toLowerCase();
    const allowed = role.map(r => r.toString().toLowerCase());
    if(!allowed.includes(userRole)){
      return res.status(403).json({
        status: "fail",
        error: "You are not authorized to access this"
      });
    }

    next();
  };
};
