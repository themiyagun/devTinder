const express = require("express");
const { validateSignUpData } = require("../utills/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  try {
    // console.log(req.body);

    //validate request data
    validateSignUpData(req);

    //encript the password

    const hash = bcrypt.hashSync(password, 10);

    // ///////
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hash,
    });
    await user.save();
    res.send("user added success");
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    //check whether user exist in DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user not found");
    } else {
      //compare the password

      const isPasswordMatch = await user.validatePassword(password);
      if (isPasswordMatch) {
        //Create JWT Token

        // const token = await jwt.sign({ _id: user._id }, "ThemiyaPaka", {
        //   expiresIn: "1d",
        // });

        const token = await user.getJWT();
        console.log(token);

        // ///////////////

        //Add the token to cookie and send response back to the user

        res.cookie("token", token);

        // ///////////////////
        res.send("login success");
      } else {
        throw new Error("invalid password");
      }
    }
  } catch (error) {
    res.status(400).send("Error while login " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    // res.clearCookie("token"); suggest krpu fn eka
    res.send("logout success");
  } catch (error) {}
});

module.exports = authRouter;
