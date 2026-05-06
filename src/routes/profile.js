const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utills/validation");
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

module.exports = profileRouter;
