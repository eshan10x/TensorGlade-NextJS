import React from "react";
import Link from 'next/link';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PrivacyPolicy = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-20">
                <div className="flex flex-col py-10">
                    <h1 className="text-4xl font-bold mb-6">
                    </h1>
                    
                    <p className="text-sm text-gray-500 mt-6">
                        Last Updated: 
                    </p>
                    
                    <div className="mt-8 mb-10">
                        <Link href="/" className="text-blue-500 hover:underline">
                            Go back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;