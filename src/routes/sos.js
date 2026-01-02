import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("🚨 SOS triggered");

        // ✅ Mock notification (MIC acceptable)
        console.log("Sending SOS notification to authorities...");

        return res.json({
            success: true,
            message: "SOS alert sent successfully",
            notified: ["Police", "Hospital", "Emergency Contact"]
        });
    } catch (err) {
        console.error("SOS Error:", err);
        res.status(500).json({ error: "Failed to send SOS" });
    }
});

export default router;

