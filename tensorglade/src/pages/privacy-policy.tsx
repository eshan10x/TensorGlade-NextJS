// In privacypolicy.tsx
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";

const PrivacyPolicy = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-20">
                <div className="flex flex-col text-primarytext py-10">
                    <h1 className="text-4xl font-bold mb-6">
                        Privacy Policy
                    </h1>

                    <div className="prose max-w-none">
                        <p className="mb-4">
                            At TensorGlade, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
                        <p className="mb-4">
                            We may collect personal information such as your name, email address, and phone number when you voluntarily provide it to us through contact forms or when subscribing to our services.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
                        <p className="mb-4">
                            The information we collect may be used to:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Provide and maintain our services</li>
                            <li>Improve our website and user experience</li>
                            <li>Send you emails regarding updates or other information</li>
                            <li>Respond to your inquiries and provide customer support</li>
                        </ul>

                        {/* Add more sections as needed */}
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        Last Updated: April 13, 2025
                    </p>

                </div>
            </main>
            <Footer />
            <Copyright />
        </div>
    );
};

export default PrivacyPolicy;