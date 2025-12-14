import { useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";

const AzureMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new atlas.Map(mapRef.current, {
            center: [78.4867, 17.3850], // Hyderabad
            zoom: 10,
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: import.meta.env.VITE_AZURE_MAPS_KEY,
            },
        });

        map.events.add("ready", () => {
            const marker = new atlas.HtmlMarker({
                position: [78.4867, 17.3850],
                text: "Tourist Spot",
            });
            map.markers.add(marker);
        });

        return () => map.dispose();
    }, []);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "500px" }}
        />
    );
};

export default AzureMap;
