import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import heroImage from "@/assets/jharkhand-hero.jpg";

const HeroSection = () => {
    const navigate = useNavigate();

    // form state
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("1");

    const handleExplore = () => {
        const params = new URLSearchParams();
        if (destination) params.set("q", destination);
        if (date) params.set("date", date);
        if (guests) params.set("guests", guests);

        navigate(`/explore?${params.toString()}`);
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                    Discover the <span className="text-sunset">Heart</span> of India
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
                    Explore Jharkhand's pristine forests, majestic waterfalls, and rich tribal heritage
                </p>

                {/* Search Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-strong max-w-3xl mx-auto animate-scale-in">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                <MapPin className="inline h-4 w-4 mr-1" />
                                Where to?
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search destinations, attractions..."
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="pl-10 bg-background border-border text-foreground"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                <Calendar className="inline h-4 w-4 mr-1" />
                                Date
                            </label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-background border-border text-foreground"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                <Users className="inline h-4 w-4 mr-1" />
                                Guests
                            </label>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                            >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3+ Guests</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleExplore}
                        className="w-full md:w-auto mt-6 bg-gradient-hero hover:opacity-90 transition-opacity"
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Explore Now
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 text-center animate-fade-in">
                    <div className="text-white/90">
                        <div className="text-3xl md:text-4xl font-bold text-sunset mb-2">50+</div>
                        <div className="text-sm md:text-base">Tourist Spots</div>
                    </div>
                    <div className="text-white/90">
                        <div className="text-3xl md:text-4xl font-bold text-sunset mb-2">15+</div>
                        <div className="text-sm md:text-base">National Parks</div>
                    </div>
                    <div className="text-white/90">
                        <div className="text-3xl md:text-4xl font-bold text-sunset mb-2">30+</div>
                        <div className="text-sm md:text-base">Tribal Villages</div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
                <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
