const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env["MONGODB_URI"];
console.log(uri);
const initializeDBConnection = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Successfully Connected");
    }
  } catch (error) {
    console.error("mongoose connection failed", error);
  }
};

module.exports = { initializeDBConnection };
