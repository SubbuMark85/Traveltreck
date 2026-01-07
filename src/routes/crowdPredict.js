import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/predict-crowd", async (req, res) => {
    try {
        const { hour, day, weather, event } = req.body;

        const azureResponse = await fetch(process.env.AZURE_ML_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.AZURE_ML_API_KEY}`
            },
            body: JSON.stringify({
                input_data: {
                    columns: ["hour", "day", "weather", "event"],
                    data: [[hour, day, weather, event]]
                }
            })
        });

        const result = await azureResponse.json();

        // SAFE extraction (works for most Azure ML endpoints)
        let crowdLevel = "MEDIUM";

        if (result?.output_data?.[0]?.scored_labels?.length) {
            crowdLevel = result.output_data[0].scored_labels[0];
        } else if (Array.isArray(result)) {
            crowdLevel = result[0];
        }

        res.json({ crowdLevel });

    } catch (error) {
        console.error("Azure ML prediction error:", error);
        res.json({ crowdLevel: "MEDIUM" }); // safe fallback
    }
});

export default router;
