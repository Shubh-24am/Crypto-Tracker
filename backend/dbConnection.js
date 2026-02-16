import mongoose from "mongoose";

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;
  const retryInterval = 5000; // 5 seconds

  const attemptConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected successfully");
      return true;
    } catch (err) {
      retries++;
      console.error(
        `MongoDB connection error (attempt ${retries}/${maxRetries}):`,
        err.message
      );

      if (retries < maxRetries) {
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
        return attemptConnection();
      } else {
        console.error("Failed to connect to MongoDB after", maxRetries, "attempts");
        console.log("Check your internet connection and MongoDB URI");
        return false;
      }
    }
  };

  return attemptConnection();
};

export default connectDB;