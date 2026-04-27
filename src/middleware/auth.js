const adminAuth = (req, res, next) => {
  const token = "xyz";
  console.log("authorize funtion");
  const isadminAuthorized = token === "xyz";
  if (!isadminAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  console.log("User authorize funtion");
  const isadminAuthorized = token === "xyz";
  if (!isadminAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
