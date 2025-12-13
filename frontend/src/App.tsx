import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index"
import Attractions from "./pages/Attractions";
import OfflinePage from "./pages/offline";
import ContactsPage from "./pages/contacts";
import HelpPage from "./pages/help";
import Chatbot from "./pages/Chatbot";
import Explore from "./pages/Explore";
import "./App.css";


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/attractions" element={<Attractions />} />
                    <Route path="/offline" element={<OfflinePage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/Chatbot" element={<Chatbot />} />
                    <Route path="/Explore" element={<Explore />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;