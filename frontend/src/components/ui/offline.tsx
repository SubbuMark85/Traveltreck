import React, { useState } from "react";
import { Download, MapPin, Compass } from "lucide-react"; // icons

const OfflineNavigation: React.FC = () => {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [status, setStatus] = useState("");

    const handleDownload = () => {
        setStatus("Downloading map data...");
        setTimeout(() => {
            setIsDownloaded(true);
            setStatus("Offline map downloaded successfully!");
        }, 2000); // mock download delay
    };

    const handleStartNavigation = () => {
        if (!isDownloaded) {
            setStatus("Please download the map before starting navigation.");
            return;
        }
        setStatus("Navigation started! You can now use it offline.");
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
                Offline Navigation
            </h2>

            <p className="text-gray-600 text-center mb-6">
                Download maps for Jharkhand and explore attractions even without internet.
            </p>

            <div className="flex flex-col gap-4">
                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                    <Download size={20} />
                    {isDownloaded ? "Re-download Map" : "Download Offline Map"}
                </button>

                {/* Start Navigation Button */}
                <button
                    onClick={handleStartNavigation}
                    className="flex items-center justify-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
                >
                    <Compass size={20} />
                    Start Offline Navigation
                </button>

                {/* Status */}
                {status && (
                    <div className="mt-4 text-center text-sm font-medium text-gray-700">
                        {status}
                    </div>
                )}
            </div>

            {/* Map Preview */}
            <div className="mt-6 border rounded-lg overflow-hidden">
                <iframe
                    title="Jharkhand Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=84.0%2C22.0%2C87.0%2C25.0&layer=mapnik"
                    className="w-full h-64"
                ></iframe>
            </div>
        </div>
    );
};

export default OfflineNavigation;
