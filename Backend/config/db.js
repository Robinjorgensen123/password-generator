import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Ansluten till MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Avsluta appen om det inte går att ansluta
  }
};

export default connectDB;