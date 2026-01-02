import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.COSMOS_MONGO_URI, {
            dbName: process.env.COSMOS_DB_NAME,
            tls: true,
            authMechanism: "SCRAM-SHA-256",
            retryWrites: false,
            serverSelectionTimeoutMS: 10000,
        });

        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed", err.message);
        process.exit(1);
    }
};

