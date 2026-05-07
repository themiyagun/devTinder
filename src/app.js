const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utills/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express(); // create express js application

app.use(express.json()); // me api eken thamai ena req eka json wlata convert krnne
app.use(cookieParser());

const appRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", appRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });

//     if (users.length === 0) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("error while fetching user data" + error.message);
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const Users = await User.find({});
//     res.send(Users);
//   } catch (error) {
//     res.status(400).send("error while fetching user data" + error.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//   } catch (error) {
//     res.status(400).send("error while deleting user data" + error.message);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   console.log(userId);
//   // const emailId = req.body.emailId;
//   const updateUser = req.body;

//   try {
//     // awashya field witrk update krnna access denne mehemai

//     const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender", "age"];
//     const isUpdateAllowed = Object.keys(updateUser).every((update) =>
//       ALLOWED_UPDATES.includes(update),
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("invalid updates!");
//     }

//     // ///////////////////////
//     if (updateUser?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10 !");
//     }

//     //

//     const user = await User.findByIdAndUpdate(userId, updateUser);
//     // const user = await User.findOneAndUpdate({ emailId: emailId }, updateUser);

//     res.send("user update successfully");
//   } catch (error) {
//     res.status(400).send("error while updating user data " + error.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("connected to database successfully");
    app.listen(7777, () => {
      console.log("Server Sucessfully listening on port 7777 ");
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
