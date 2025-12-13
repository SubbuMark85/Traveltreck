import { Card, CardContent } from "@/components/ui/card";
import { Mountain, TreePine, Building, Heart, Camera, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "Natural Wonders",
        icon: TreePine,
        count: "25+ Places",
        description: "Forests, waterfalls & wildlife",
        color: "text-forest",
        bgColor: "bg-forest/10",
        link: "/attractions?category=nature"
    },
    {
        name: "Adventure Sports",
        icon: Mountain,
        count: "15+ Activities",
        description: "Trekking, river rafting & more",
        color: "text-waterfall",
        bgColor: "bg-waterfall/10",
        link: "/attractions?category=adventure"
    },
    {
        name: "Cultural Heritage",
        icon: Building,
        count: "30+ Sites",
        description: "Tribal villages & museums",
        color: "text-tribal",
        bgColor: "bg-tribal/10",
        link: "/attractions?category=culture"
    },
    {
        name: "Religious Sites",
        icon: Heart,
        count: "20+ Temples",
        description: "Sacred temples & shrines",
        color: "text-sunset",
        bgColor: "bg-sunset/10",
        link: "/attractions?category=religious"
    },
    {
        name: "Photography Spots",
        icon: Camera,
        count: "40+ Locations",
        description: "Instagram-worthy views",
        color: "text-primary",
        bgColor: "bg-primary/10",
        link: "/attractions?category=photography"
    },
    {
        name: "Lakes & Rivers",
        icon: Waves,
        count: "12+ Water Bodies",
        description: "Serene lakes & flowing rivers",
        color: "text-waterfall",
        bgColor: "bg-waterfall/10",
        link: "/attractions?category=water"
    }
];

const CategoryCards = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Explore by <span className="text-primary">Category</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose your adventure and discover what makes Jharkhand unique
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link key={category.name} to={category.link}>
                            <Card
                                className="group cursor-pointer border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-4">
                                        <div className={`${category.bgColor} ${category.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                            <category.icon className="h-6 w-6" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {category.description}
                                            </p>
                                            <p className="text-sm font-medium text-primary">
                                                {category.count}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCards;