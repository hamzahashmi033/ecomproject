const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) {
    return res.status(404).json({
      message: "Not Valid User",
    });
  }
  const token = authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      decoded,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Sider Error",
      error: err.message,
    });
  }
  req.user = decoded.id;
  next();
};
