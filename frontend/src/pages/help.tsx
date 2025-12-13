import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HelpCircle, Phone, Mail, Map } from "lucide-react";

const faqs = [
    {
        question: "How do I download offline maps?",
        answer:
            "Go to Offline Navigation, click 'Download Offline Map', and the map will be available without internet.",
    },
    {
        question: "What should I do in case of an emergency?",
        answer:
            "Click the red 'SOS' button in the top-right corner to quickly access emergency numbers.",
    },
    {
        question: "How can I contact nearby agents?",
        answer:
            "Visit the Contacts section to find local agent numbers, tourism helpdesks, and emergency contacts.",
    },
    {
        question: "Can I book tourist spots in advance?",
        answer:
            "Currently, booking is not available online. You can explore destinations and contact agents for assistance.",
    },
];

const HelpPage: React.FC = () => {
    return (
        <div>
            <Header />

            <main className="pt-20 px-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Help & Support
                </h1>
                <p className="text-gray-600 mb-10 text-center">
                    Need assistance? Browse FAQs or reach out to our support team.
                </p>

                {/* FAQs Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
                            >
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <HelpCircle size={18} /> {faq.question}
                                </h3>
                                <p className="text-gray-600 mt-2">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Support Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-600">
                        Still Need Help?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg shadow bg-white text-center">
                            <Phone className="mx-auto text-green-600" size={24} />
                            <h3 className="font-semibold mt-2">Phone Support</h3>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow bg-white text-center">
                            <Mail className="mx-auto text-green-600" size={24} />
                            <h3 className="font-semibold mt-2">Email Support</h3>
                            <p className="text-gray-600">support@discoverjharkhand.in</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow bg-white text-center">
                            <Map className="mx-auto text-green-600" size={24} />
                            <h3 className="font-semibold mt-2">Visit Us</h3>
                            <p className="text-gray-600">Tourism Office, Ranchi</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HelpPage;
