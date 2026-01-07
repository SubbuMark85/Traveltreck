import "./Crowdalrets.css";
import { useEffect, useState } from "react";

export default function CrowdAlert({ area = "Banjara Hills" }) {
    const [level, setLevel] = useState("MEDIUM");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrowdLevel = async () => {
            try {
                const now = new Date();
                const hour = now.getHours();
                const day = now.getDay();

                // ---- DEMO-SAFE SIMULATION LOGIC ---
                const weather = Math.floor(Math.random() * 3); // 0,1,2
                const event = hour >= 18 && hour <= 22 ? 1 : 0;

                const response = await fetch("http://localhost:8080/api/predict-crowd", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        hour,
                        day,
                        weather,
                        event
                    })
                });

                const data = await response.json();
                setLevel(data.crowdLevel || "MEDIUM");

            } catch (err) {
                console.error("Crowd prediction failed", err);
                setLevel("MEDIUM");
            } finally {
                setLoading(false);
            }
        };

        fetchCrowdLevel();
    }, []);

    return (
        <div className="crowd-alert-card">
            <h3>🚦 Crowd Alert</h3>

            <p><b>Area:</b> {area}</p>

            <div className={`crowd-level ${level.toLowerCase()}`}>
                {loading ? "ANALYZING..." : `${level} CROWD`}
            </div>

            <p className="crowd-msg">
                {level === "HIGH" && "Heavy tourist movement detected. Consider alternate routes."}
                {level === "MEDIUM" && "Moderate crowd levels. Travel with caution."}
                {level === "LOW" && "Crowd levels are low. Safe to proceed."}
            </p>
        </div>
    );
}
