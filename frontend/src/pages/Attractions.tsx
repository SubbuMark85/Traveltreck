import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
    { id: "all", name: "All Categories" },
    { id: "nature", name: "Natural Wonders" },
    { id: "culture", name: "Cultural Heritage" },
    { id: "religious", name: "Religious Sites" },
    { id: "adventure", name: "Adventure Sports" },
];

const Attractions = () => {
    const [attractions, setAttractions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch attractions from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/attractions")
            .then((res) => res.json())
            .then((data) => setAttractions(data))
            .catch((err) => console.error("❌ Error fetching attractions:", err));
    }, []);

    // Filter logic
    const filteredAttractions = attractions.filter((attraction) => {
        const matchesCategory =
            selectedCategory === "all" || attraction.category === selectedCategory;
        const matchesSearch =
            attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attraction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attraction.tags.some((tag: string) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-hero text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Explore <span className="text-sunset">Attractions</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                        Discover the hidden gems and popular destinations that make
                        Jharkhand extraordinary
                    </p>
                </div>
            </section>

            {/* Filters & Search */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search attractions, locations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-background"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={
                                        selectedCategory === category.id ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="whitespace-nowrap"
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>

                        {/* Filter Button */}
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            More Filters
                        </Button>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground">
                            Showing {filteredAttractions.length} attractions
                            {selectedCategory !== "all" &&
                                ` in ${categories.find((c) => c.id === selectedCategory)?.name
                                }`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Attractions Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAttractions.map((attraction, index) => (
                            <Card
                                key={attraction.id}
                                className="group overflow-hidden border-0 shadow-medium hover:shadow-strong transition-all duration-300 bg-gradient-card animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={`http://localhost:5000${attraction.image}`}
                                        alt={attraction.name}
                                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                                        <Star className="h-3 w-3 text-sunset fill-current mr-1" />
                                        <span className="text-xs font-medium">
                                            {attraction.rating}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="flex flex-wrap gap-1">
                                            {attraction.tags.slice(0, 2).map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-xs bg-white/90 text-foreground"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {attraction.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {attraction.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm mb-4">
                                        <div className="flex items-center text-muted-foreground">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {attraction.location}
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {attraction.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-bold text-primary">
                                            {attraction.price}
                                        </div>
                                        <Link to={`/attractions/${attraction.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="group/btn"
                                            >
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredAttractions.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg">
                                No attractions found matching your criteria.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSearchTerm("");
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Attractions;
