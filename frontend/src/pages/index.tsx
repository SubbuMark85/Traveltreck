import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestination";
import CategoryCards from "@/components/CategoryCards";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <HeroSection />
            <FeaturedDestinations />
            <CategoryCards />
            <Footer />
        </div>
    );
};

export default Index;