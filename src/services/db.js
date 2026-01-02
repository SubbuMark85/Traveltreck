// import mongoose from "mongoose";

// const MONGO_URI = process.env.COSMOS_MONGO_URI;
// const DB_NAME = process.env.COSMOS_DB_NAME;

// if (!MONGO_URI) {
//     throw new Error("COSMOS_MONGO_URI is missing");
// }

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(MONGO_URI, {
//             dbName: DB_NAME,
//         });

//         console.log("✅ Connected to Cosmos DB (Mongo API)");
//     } catch (err) {
//         console.error("❌ Mongo connection failed:", err);
//         process.exit(1);
//     }
// };
