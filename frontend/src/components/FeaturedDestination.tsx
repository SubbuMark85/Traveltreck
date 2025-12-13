import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import tribalVillage from "@/assets/tribal-village.jpg";
import deogharTemple from "@/assets/deoghar-temple.jpg";

const destinations = [
    {
        id: 1,
        name: "Hundru Falls",
        category: "Waterfall",
        image: hundruFalls,
        rating: 4.8,
        duration: "2-3 hours",
        description: "Experience the thunderous beauty of Jharkhand's highest waterfall",
        location: "Ranchi",
        price: "₹50"
    },
    {
        id: 2,
        name: "Betla National Park",
        category: "Wildlife",
        image: betlaPark,
        rating: 4.6,
        duration: "Full day",
        description: "Witness elephants, tigers, and diverse wildlife in their natural habitat",
        location: "Latehar",
        price: "₹200"
    },
    {
        id: 3,
        name: "Tribal Heritage Village",
        category: "Culture",
        image: tribalVillage,
        rating: 4.7,
        duration: "3-4 hours",
        description: "Immerse yourself in authentic tribal culture and traditions",
        location: "Khunti",
        price: "₹100"
    },
    {
        id: 4,
        name: "Deoghar Temple Complex",
        category: "Religious",
        image: deogharTemple,
        rating: 4.9,
        duration: "Half day",
        description: "Sacred pilgrimage site with ancient temples and spiritual atmosphere",
        location: "Deoghar",
        price: "Free"
    }
];

const FeaturedDestinations = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Featured <span className="text-primary">Destinations</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Discover the most breathtaking attractions that showcase Jharkhand's natural beauty and cultural richness
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((destination, index) => (
                        <Card
                            key={destination.id}
                            className="group overflow-hidden border-0 shadow-medium hover:shadow-strong transition-all duration-300 bg-gradient-card animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        {destination.category}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                                    <Star className="h-3 w-3 text-sunset fill-current mr-1" />
                                    <span className="text-xs font-medium">{destination.rating}</span>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {destination.name}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {destination.description}
                                </p>

                                <div className="flex items-center justify-between text-sm mb-4">
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {destination.location}
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {destination.duration}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-bold text-primary">Entry :-
                                        {destination.price}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/attractions">
                        <Button size="lg" variant="outline" className="group">
                            View All Destinations
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDestinations;