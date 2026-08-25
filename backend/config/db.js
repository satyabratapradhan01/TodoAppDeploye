// ===========================================
// config/db.js - MongoDB Connection
// ===========================================
// This file handles connecting to MongoDB using Mongoose.
//
// HOW IT WORKS:
// 1. Reads the MongoDB connection string from the MONGO_URI env variable
// 2. Uses mongoose.connect() to establish a connection
// 3. Logs success or exits the process on failure
//
// This function is called once from server.js when the app starts.

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // mongoose.connect() returns a connection object
    // The connection string (MONGO_URI) looks like:
    // mongodb+srv://username:password@cluster.mongodb.net/dbname
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure code (1) if we can't connect to the database
    // The app can't function without a database connection
    process.exit(1);
  }
};

export default connectDB;
