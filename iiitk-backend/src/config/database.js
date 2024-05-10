// src/config/database.js

const mongoose = require("mongoose");

// Define the MongoDB connection URI (replace 'test' with your database name)
const mongoURI = "mongodb+srv://ashishsonii2002:1234567890@taskmanager.qfjmkxc.mongodb.net/TaskManager";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define your Mongoose models and schema here
const Cat = mongoose.model("Cat", { name: String });

// Export your models or connection for use in other parts of your app
module.exports = {
  Cat,
  mongoose, // You can also export the mongoose instance if needed
};
