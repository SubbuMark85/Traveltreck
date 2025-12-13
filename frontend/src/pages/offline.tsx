import React from "react";
import Header from "../components/Header";
import OfflineNavigation from "../components/ui/offline";

const OfflinePage: React.FC = () => {
    return (
        <div>
            {/* Header stays fixed at top */}
            <Header />

            {/* Content section */}
            <main className="pt-20 px-4">
                <OfflineNavigation />
            </main>
        </div>
    );
};

export default OfflinePage;
