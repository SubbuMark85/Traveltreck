// backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import chatRoutes from "./src/routes/chat.js";
import mapsRoutes from "./src/routes/maps.js";
import aiRoutes from "./src/routes/ai.js";
import sosRoutes from "./src/routes/sos.js";
import userRoutes from "./src/routes/user.js";
import { connectDB } from "./src/db/mongo.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/users", userRoutes);



// ✅ Serve static images 
app.use("/images", express.static("public/images"));

// ✅ Attractions data 
const attractions = [
    {
        id: 1,
        name: "Hundru Falls",
        category: "nature",
        image: "/images/beach.jpg",
        rating: 4.8,
        duration: "2-3 hours",
        description: "Experience the thunderous beauty of Jharkhand's highest waterfall cascading from 320 feet",
        location: "Ranchi",
        price: "₹50",
        tags: ["Waterfall", "Photography", "Nature"]
    },
    {
        id: 2,
        name: "Betla National Park",
        category: "nature",
        image: "/images/Dance.jpg",
        rating: 4.6,
        duration: "Full day",
        description: "Witness elephants, tigers, and diverse wildlife in their natural habitat across 979 sq km",
        location: "Latehar",
        price: "₹200",
        tags: ["Wildlife", "Safari", "Adventure"]
    },
    {
        id: 3,
        name: "Tribal Heritage Village",
        category: "culture",
        image: "/images/rock.jpg",
        rating: 4.7,
        duration: "3-4 hours",
        description: "Immerse yourself in authentic tribal culture, traditional dances, and local crafts",
        location: "Khunti",
        price: "₹100",
        tags: ["Culture", "Traditional", "Art"]
    },
    {
        id: 4,
        name: "Deoghar Temple Complex",
        category: "religious",
        image: "/images/sky.jpg",
        rating: 4.9,
        duration: "Half day",
        description: "Sacred pilgrimage site with ancient Baidyanath Temple and spiritual atmosphere",
        location: "Deoghar",
        price: "Free",
        tags: ["Temple", "Spiritual", "Heritage"]
    }
];

// ChatBot

app.post("/api/chat", (req, res) => {
    const { prompt } = req.body;

    let reply = `You said: "${prompt}". I'm still learning, but I can guide you about Jharkhand's waterfalls, temples, and forests.`;

    // simple keyword match (optional)
    if (prompt.toLowerCase().includes("waterfall")) {
        reply = "Jharkhand has amazing waterfalls like Dassam, Hundru, and Jonha Falls!";
    }

    res.json({ reply });
});

// ✅ Emergency contacts
const emergencyContacts = [
    { id: 1, type: "Police", phone: "100" },
    { id: 2, type: "Ambulance", phone: "102" },
    { id: 3, type: "Tourism Helpline", phone: "1800-123-456" }
];

// ✅ Store feedback in JSON file
const FEEDBACK_FILE = "./feedback.json";

// -------- API ROUTES --------

// Root check
app.get("/", (req, res) => {
    res.status(200).send("Tourism Services API is running");
});

// Attractions
app.get("/api/attractions", (req, res) => {
    res.json(attractions);
});

// Emergency contacts
app.get("/api/emergency", (req, res) => {
    res.json(emergencyContacts);
});

//maps
app.post("/api/maps/route", async (req, res) => {
    console.log("REQ BODY:", req.body);

    const { start, end, mode } = req.body;

    if (!start || !end) {
        return res.status(400).json({ error: "Missing coordinates" });
    }

    // temporary test response
    res.json({
        distance_km: 148.3,
        duration_min: 131,
        points: [
            { latitude: start.lat, longitude: start.lon },
            { latitude: end.lat, longitude: end.lon }
        ]
    });
});

app.post("/api/maps/route", async (req, res) => {
    try {
        const { start, end, mode = "car" } = req.body;

        if (!start || !end) {
            return res.status(400).json({ error: "Missing coordinates" });
        }

        const url =
            `https://atlas.microsoft.com/route/directions/json` +
            `?api-version=1.0` +
            `&travelMode=${mode}` +
            `&query=${start.lat},${start.lon}:${end.lat},${end.lon}` +
            `&subscription-key=${process.env.AZURE_MAPS_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
            return res.status(500).json({ error: "No route found" });
        }

        const route = data.routes[0];

        res.json({
            distance_km: Number(
                (route.summary.lengthInMeters / 1000).toFixed(2)
            ),
            duration_min: Number(
                (route.summary.travelTimeInSeconds / 60).toFixed(1)
            ),
            points: route.legs[0].points
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Routing failed" });
    }
});

//SOS 

app.post("/api/sos", (req, res) => {
    const { latitude, longitude, message } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Location required" });
    }

    const sosEvent = {
        id: Date.now(),
        latitude,
        longitude,
        message: message || "Emergency SOS triggered",
        timestamp: new Date().toISOString(),
    };

    console.log("🚨 SOS EVENT:", sosEvent);

    // TEMP: mock notification
    res.json({
        success: true,
        status: "SOS received",
        sosEvent,
    });
});



// Feedback
app.post("/api/feedback", (req, res) => {
    const feedback = req.body;
    if (!feedback.name || !feedback.message) {
        return res.status(400).json({ error: "Name and message are required" });
    }

    let feedbacks = [];
    if (fs.existsSync(FEEDBACK_FILE)) {
        feedbacks = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
    }

    feedbacks.push({
        id: feedbacks.length + 1,
        ...feedback,
        date: new Date().toISOString()
    });

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));

    res.status(201).json({ message: "Feedback received ✅" });
});

// Start server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Backend running on port ${PORT}`);
    });
});

