const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/flipr";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongo suc....");
  });
};

module.exports = connectToMongo;
