import mongose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
