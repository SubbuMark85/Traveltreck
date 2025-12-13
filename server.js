// backend/server.js
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images (put them in backend/public/images)
app.use("/images", express.static("public/images"));

// ✅ Attractions data (matches your frontend UI)
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

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
