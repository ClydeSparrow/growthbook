import bluebird from "bluebird";
import mongoose from "mongoose";
import { logger } from "../util/logger";
import { MONGODB_URI } from "../util/secrets";

mongoose.Promise = bluebird;

export default async () => {
  // Connect to MongoDB
  try {
    let uri = MONGODB_URI;
    if (process.env.NODE_ENV === "test") {
      uri = process.env.MONGO_URL || "";
    }

    return await mongoose.connect(uri);
  } catch (e) {
    logger.error(e, "Failed to connect to MongoDB");
    throw new Error("MongoDB connection error.");
  }
};
