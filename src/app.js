const express = require("express");

const app = express(); // create express js application

app.use("/test", (req, res) => {
  res.send("hello i'm from server");
});

app.use("/hello", (req, res) => {
  res.send("hello hello");
});

app.listen(7777, () => {
  console.log("Server Sucessfully listening on port 7777 ");
});
