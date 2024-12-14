import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://mongo:27017/todouser/";
    console.log(`Attempting to connect to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};


export default connectDB;
