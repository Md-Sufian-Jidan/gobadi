import dns from "dns";
import mongoose from "mongoose";
import { env } from "./env";

// Use Google's public DNS to resolve MongoDB Atlas SRV records
// (fixes ECONNREFUSED on networks that block SRV lookups)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose | null> => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(env.database_url);
    console.log("MongoDB connected successfully");
    return cachedConnection;
  } catch (error) {
    console.warn("MongoDB connection unavailable; continuing without database access:", error);
    return null;
  }
};

export default connectDB;