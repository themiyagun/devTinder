// const adminAuth = (req, res, next) => {
//   const token = "xyz";
//   console.log("authorize funtion");
//   const isadminAuthorized = token === "xyz";
//   if (!isadminAuthorized) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const userAuth = (req, res, next) => {
//   const token = "xyz";
//   console.log("User authorize funtion");
//   const isadminAuthorized = token === "xyz";
//   if (!isadminAuthorized) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Unauthorized Token not found");
    }

    const decodeMessage = await jwt.verify(token, "ThemiyaPaka");

    const { _id } = decodeMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
};

module.exports = { userAuth };
