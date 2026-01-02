import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/route", async (req, res) => {
    try {
        const { startLat, startLon, endLat, endLon } = req.query;

        if (!startLat || !startLon || !endLat || !endLon) {
            return res.status(400).json({ error: "Missing coordinates" });
        }

        const url = `https://atlas.microsoft.com/route/directions/json?api-version=1.0&travelMode=car&query=${startLat},${startLon}:${endLat},${endLon}&subscription-key=${process.env.AZURE_MAPS_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        const route = data.routes[0];
        const summary = route.summary;

        res.json({
            distance_km: (summary.lengthInMeters / 1000).toFixed(2),
            duration_min: Math.round(summary.travelTimeInSeconds / 60),
            points: route.legs[0].points
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Route calculation failed" });
    }
});

export default router;
