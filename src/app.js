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

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    //check whether user exist in DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user not found");
    } else {
      //compare the password

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        //Create JWT Token

        const token = await jwt.sign({ _id: user._id }, "ThemiyaPaka", {
          expiresIn: "1d",
        });
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error while login " + error.message);
  }
});

app.post("/sendConnectionRquest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " connection request sent successfully");
  } catch (error) {
    res
      .status(400)
      .send("Error while sending connection request " + error.message);
  }
});

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
