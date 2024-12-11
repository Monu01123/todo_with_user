import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://localhost:27017/todouser";
    await mongoose.connect(mongoURI);
    console.log("MonogoDB connected successfully");
  } catch (error) {
    console.error("MonogoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
