import { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";

import Header from "@/components/Header";
import { fetchTravelAI } from "../services/travelAI";
import "./offline.css";

type RouteInfo = {
    distance_km: number;
    duration_min: number;
};

const AzureMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<atlas.Map | null>(null);

    const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
    const [aiResult, setAiResult] = useState<any>(null);

    /* ---------------- MAP + ROUTE ---------------- */
    useEffect(() => {
        if (!mapRef.current) return;

        map.current = new atlas.Map(mapRef.current, {
            center: [78.4867, 17.3850], // Hyderabad
            zoom: 10,
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: import.meta.env.VITE_AZURE_MAPS_KEY
            }
        });

        map.current.events.add("ready", async () => {
            const res = await fetch("http://localhost:8080/api/maps/route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    start: { lat: 17.385044, lon: 78.486671 },
                    end: { lat: 17.406498, lon: 78.477243 },
                    mode: "driving"
                })
            });

            const data = await res.json();

            // ---- route metrics ----
            setRouteInfo({
                distance_km: Number(data.distance_km),
                duration_min: Number(data.duration_min)
            });

            // ---- draw route ----
            const coordinates = data.points.map((p: any) => [
                p.longitude,
                p.latitude
            ]);

            const source = new atlas.source.DataSource();
            map.current!.sources.add(source);

            source.add(new atlas.data.LineString(coordinates));

            map.current!.layers.add(
                new atlas.layer.LineLayer(source, "route-layer", {
                    strokeColor: "#0078D4",
                    strokeWidth: 5
                })
            );
        });

        return () => map.current?.dispose();
    }, []);

    /* ---------------- AI INSIGHTS ---------------- */
    useEffect(() => {
        if (!routeInfo) return;

        fetchTravelAI({
            distance_km: routeInfo.distance_km,
            duration_min: routeInfo.duration_min,
            mode: "driving"
        })
            .then(setAiResult)
            .catch(console.error);
    }, [routeInfo]);

    /* ---------------- UI ---------------- */
    return (
        <>
            <Header />
            <div className="map-layout">

                {/* LEFT PANEL */}
                <div className="route-panel">
                    {routeInfo ? (
                        <>
                            <h3>Route Info</h3>
                            <p><b>Distance:</b> {routeInfo.distance_km} km</p>
                            <p><b>Duration:</b> {routeInfo.duration_min} mins</p>

                            {aiResult ? (
                                <>
                                    <p><b>Risk:</b> {aiResult.riskLevel ?? "Unknown"}</p>
                                    <p><b>Summary:</b> {aiResult.summary ?? "No summary available"}</p>
                                </>
                            ) : (
                                <p><i>Analyzing route safety…</i></p>
                            )}
                        </>
                    ) : (
                        <p>Select a destination to see route details</p>
                    )}
                </div>


                {/* MAP */}
                <div className="map-wrapper">
                    <div ref={mapRef} className="map-container" />
                </div>

            </div>
        </>
    );
};

/* ---------------- STYLE ---------------- */
const cardStyle: React.CSSProperties = {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 10,
    maxWidth: "320px"
};
export default AzureMap;
