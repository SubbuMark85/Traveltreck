export function generateTravelInsights({ distance_km, duration_min, mode }) {
    let riskLevel = "LOW";
    let alerts = [];
    let recommendations = [];

    if (distance_km > 100) {
        riskLevel = "MEDIUM";
        alerts.push("Long-distance travel detected");
        recommendations.push("Carry water and plan rest stops");
    }

    if (duration_min > 120) {
        riskLevel = "HIGH";
        alerts.push("Extended travel duration");
        recommendations.push("Avoid night travel");
        recommendations.push("Share trip status with emergency contact");
    }

    if (mode === "driving") {
        alerts.push("Traffic congestion possible in city areas");
        recommendations.push("Check traffic before departure");
    }

    return {
        summary: `Trip is ${distance_km} km and will take approximately ${duration_min} minutes.`,
        riskLevel,
        alerts,
        recommendations
    };
}


/*
NOTE:
 * This rule-based AI engine is a temporary fallback.
 * Once Azure OpenAI quota is approved, this module
 * will be replaced with GPT-based reasoning using
 * Azure OpenAI Chat Completions without changing
 * frontend or API contracts.
 */
