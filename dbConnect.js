const mongoose = require("mongoose");

const connectDB = async (MONGO_URI) => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connectDB,
};
