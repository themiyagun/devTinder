const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express(); // create express js application

// const { adminAuth } = require("./middleware/auth");
// const { userAuth } = require("./middleware/auth");

// app.get("/user/:id", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "John", lastName: "Doe" });
// });
// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("first clg");
//     res.send("response1");
//     next();
//   },
//   (req, res) => {
//     console.log("2nd clg");
//     res.send("2nd response");
//   },
// );

// app.post("/user", (req, res) => {
//   res.send("send user data successfull to database");
// });
// app.delete("/user", (req, res) => {
//   res.send("delete users successfully from server");
// });

// app.use("/test", (req, res) => {
//   res.send("hello i'm from server");
// });

//Middle ware
// authorization -admingen eddi token eka check krla ewnwa
//admin ge hama route ekaktama check kra kra dana eka practical nati nisa me concept eka use krnwa

// app.use("/admin", adminAuth);
// // app.use("/user", userAuth);

// app.get("/user/login", (req, res) => {
//   res.send("user  login");
// });
// app.get("/user", userAuth, (req, res) => {
//   res.send("send user data successfull to database");
// });

// app.get("/admin/getalldata", (req, res) => {
//   //logic of fecthing all data

//   res.send("all data fetched successfully");
// });
// app.get("/admin/deleteUser", (req, res) => {
//   //logic of delete user

//   res.send("Deleted a user");
// });

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "themi",
    lastName: "Gunasekara",
    emailId: "temi@123.com",
    password: "temi123",
  });

  try {
    await user.save();
    res.send("user added success");
  } catch (error) {
    res.status(400).send("error while adding user" + error.message);
  }
});

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
