const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namasthedev:YmPEbBRyi34IlvRY@namasthenode.hh0wfdr.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
