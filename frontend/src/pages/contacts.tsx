import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Phone, MapPin } from "lucide-react";

interface Contact {
    name: string;
    role: string;
    phone: string;
    location: string;
}

const contacts: Contact[] = [
    {
        name: "Pooja",
        role: "Tourism Helpdesk",
        phone: "+91 8008353069",
        location: "Ranchi",
    },
    {
        name: "Sampath",
        role: "Emergency Support",
        phone: "+91 6302956233",
        location: "Jamshedpur",
    },
    {
        name: "Vinneth",
        role: "Local Travel Agent",
        phone: "+91 9290569936",
        location: "Dhanbad",
    },
    {
        name: "Vipin",
        role: "Forest Dept. Helpline",
        phone: "+91 7013324566",
        location: "Hazaribagh",
    },
];

const ContactsPage: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="pt-20 px-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Contact & Support
                </h1>
                <p className="text-gray-600 mb-10 text-center">
                    Reach out to nearby agents, helpdesks, and emergency contacts while exploring Jharkhand.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="p-5 border rounded-2xl shadow hover:shadow-lg transition bg-white"
                        >
                            <h2 className="text-xl font-semibold text-green-800">
                                {contact.name}
                            </h2>
                            <p className="text-gray-600">{contact.role}</p>
                            <div className="flex items-center mt-3 text-gray-700">
                                <Phone size={18} className="mr-2 text-green-600" />
                                <a href={`tel:${contact.phone}`} className="hover:underline">
                                    {contact.phone}
                                </a>
                            </div>
                            <div className="flex items-center mt-1 text-gray-700">
                                <MapPin size={18} className="mr-2 text-orange-600" />
                                <span>{contact.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactsPage;
