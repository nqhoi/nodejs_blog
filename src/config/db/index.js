const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Successfully");
  } catch (error) {
    consele.log("Connect Faling test");
  }
}

module.exports = { connect };
