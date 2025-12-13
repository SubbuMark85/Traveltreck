import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_MODEL}/chat/completions?api-version=2024-02-15`,
            {
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.7
            },
            {
                headers: {
                    "api-key": process.env.AZURE_OPENAI_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data.choices[0].message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI failed" });
    }
});

export default router;
