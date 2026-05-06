const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRquest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " connection request sent successfully");
  } catch (error) {
    res
      .status(400)
      .send("Error while sending connection request " + error.message);
  }
});

module.exports = requestRouter;
