const express = require("express");
const { userAuth } = require("../middleware/auth");
const {
  validateProfileEditData,
  validateSignUpData,
  validatePassword,
} = require("../utills/validation");

const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error while login " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid update fields");
    }

    const loggedInUser = req.user;
    const updateData = req.body;

    Object.keys(updateData).forEach((key) => {
      loggedInUser[key] = updateData[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} : Profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error  " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePassword(req);

    const newPassword = req.body.password;

    //encript the new password
    const hash = bcrypt.hashSync(newPassword, 10);

    const loggedInUser = req.user;
    loggedInUser.password = hash;

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} : Password updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error  " + error.message);
  }
});

module.exports = profileRouter;
