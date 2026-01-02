import express from "express";
import { generateTravelInsights } from "../services/aiService.js";

const router = express.Router();

router.post("/travel-insights", async (req, res) => {
    try {
        const { distance_km, duration_min, mode } = req.body;

        if (!distance_km || !duration_min) {
            return res.status(400).json({ error: "Missing route data" });
        }

        const aiResponse = generateTravelInsights({
            distance_km,
            duration_min,
            mode
        });

        res.json(aiResponse);
    } catch (err) {
        res.status(500).json({ error: "AI processing failed" });
    }
});

export default router;
