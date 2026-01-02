import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create user

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Get user by id

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found" });
    }
});

// Save itinerary
router.post("/:id/itinerary", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.itineraries.push(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to save itinerary" });
    }
});

export default router;
