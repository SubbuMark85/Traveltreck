import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <MapPin className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">
                                Discover <span className="text-primary">Jharkhand</span>
                            </span>
                        </Link>
                        <p className="text-background/80 mb-6">
                            Your gateway to exploring the natural beauty, rich culture, and adventure opportunities of Jharkhand.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-background/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-background/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-background/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-background/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Explore</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/attractions" className="text-background/80 hover:text-primary transition-colors">
                                    Tourist Attractions
                                </Link>
                            </li>
                            <li>
                                <Link to="/itineraries" className="text-background/80 hover:text-primary transition-colors">
                                    Travel Itineraries
                                </Link>
                            </li>
                            <li>
                                <Link to="/accommodation" className="text-background/80 hover:text-primary transition-colors">
                                    Hotels & Stay
                                </Link>
                            </li>
                            <li>
                                <Link to="/guides" className="text-background/80 hover:text-primary transition-colors">
                                    Travel Guides
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Categories</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/attractions?category=nature" className="text-background/80 hover:text-primary transition-colors">
                                    Natural Wonders
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions?category=culture" className="text-background/80 hover:text-primary transition-colors">
                                    Cultural Heritage
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions?category=adventure" className="text-background/80 hover:text-primary transition-colors">
                                    Adventure Sports
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions?category=religious" className="text-background/80 hover:text-primary transition-colors">
                                    Religious Sites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span className="text-background/80">
                                    Tourism Department, Ranchi, Jharkhand
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span className="text-background/80">
                                    +91 651-2446358
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="text-background/80">
                                    info@discoverjharkhand.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-background/60 text-sm">
                        © 2024 Discover Jharkhand. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-background/60 hover:text-primary text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-background/60 hover:text-primary text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/support" className="text-background/60 hover:text-primary text-sm transition-colors">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;