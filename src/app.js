const express = require("express");

const app = express(); // create express js application

app.get("/user", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
  res.send("send user data successfull to database");
});
app.delete("/user", (req, res) => {
  res.send("delete users successfully from server");
});

app.use("/test", (req, res) => {
  res.send("hello i'm from server");
});

app.listen(7777, () => {
  console.log("Server Sucessfully listening on port 7777 ");
});
