export type TravelAIResponse = {
    summary: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    alerts: string[];
    recommendations: string[];
};

export async function fetchTravelAI(routeInfo: {
    distance_km: number;
    duration_min: number;
    mode: string;
}): Promise<TravelAIResponse> {
    const res = await fetch("https://tourism-services-djcnd9g5fze0dzg7.centralindia-01.azurewebsites.net/api/ai/travel-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routeInfo)
    });

    if (!res.ok) {
        throw new Error("Travel AI failed");
    }

    return res.json();
}
