import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [showEmergency, setShowEmergency] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Add/remove fullscreen class to root when emergency popup is shown
    useEffect(() => {
        const root = document.getElementById("root");
        if (showEmergency) {
            root?.classList.add("fullscreen");
        } else {
            root?.classList.remove("fullscreen");
        }
    }, [showEmergency]);

    const handleSOSClick = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/emergency");
            if (!response.ok) throw new Error("Failed to fetch contacts");
            const data = await response.json();
            setContacts(data);
            setShowEmergency(true);
            setError("");
        } catch (err) {
            setError("Emergency contacts unavailable");
            setShowEmergency(false);
        }
    };

    const handleNumberClick = (contact: { type: string; phone: string }) => {
        setSuccessMsg(`Successfully triggered for: ${contact.type} (${contact.phone})`);
        setTimeout(() => setSuccessMsg(""), 2000);
    };

    return (
        <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <MapPin className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
                        <span className="text-xl font-bold text-foreground">
                            Discover <span className="text-primary">Jharkhand</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-foreground hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link to="/attractions" className="text-foreground hover:text-primary transition-colors">
                            Attractions
                        </Link>
                        <Link to="/offline" className="text-foreground hover:text-primary transition-colors">
                            Offline Navigation
                        </Link>
                        <Link to="/contacts" className="text-foreground hover:text-primary transition-colors">
                            Contacts
                        </Link>
                        <Link to="/help" className="text-foreground hover:text-primary transition-colors">
                            Help
                        </Link>
                        <Link to="/chatbot" className="text-foreground hover:text-primary transition-colors">
                            Chatbot
                        </Link>
                    </nav>

                    {/* Search Bar and SOS */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            className="bg-red-700 text-white font-bold px-5 py-2 rounded w-20 hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-400"
                            aria-label="Emergency SOS"
                            onClick={handleSOSClick}
                        >
                            SOS
                        </button>

                        <Button variant="default" size="sm">
                            Sign out
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-foreground" />
                        ) : (
                            <Menu className="h-6 w-6 text-foreground" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 animate-fade-in">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Search destinations..." className="pl-10 bg-muted/50 border-muted" />
                        </div>
                        <Link to="/" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/attractions" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Attractions
                        </Link>
                        <Link to="/itineraries" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Offline Navigation
                        </Link>
                        <Link to="/accommodation" className="block text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                            Contacts
                        </Link>
                        <Button variant="default" size="sm" className="w-full">
                            Sign out
                        </Button>
                    </div>
                )}
            </div>

            {/* Emergency contacts popup */}
            {showEmergency && (
                <div className="emergency-overlay">
                    <div className="emergency-popup">
                        <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <ul className="mb-4">
                            {contacts.map((contact) => (
                                <li key={contact.id} className="mb-2">
                                    {contact.type}:{" "}
                                    <button
                                        className="text-blue-600 underline hover:text-blue-800"
                                        onClick={() => handleNumberClick(contact)}
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}
                                    >
                                        {contact.phone}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {successMsg && (
                            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded">
                                {successMsg}
                            </div>
                        )}
                        <button
                            onClick={() => setShowEmergency(false)}
                            className="bg-red-700 text-white font-semibold px-4 py-2 rounded hover:bg-red-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
