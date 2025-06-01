import React from "react";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 px-4 md:px-10 lg:px-20 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-center text-orange-500 mb-8">
                    TensorGlade
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    <div>
                        <h3 className="font-bold text-lg text-black">Company</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                <Link href="#about" scroll={true} className="hover:text-hoverprimary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-hoverprimary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-hoverprimary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-black">Our Products</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>Product 1</li>
                            <li>Product 2</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-black">Case Studies</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                                sample1
                                <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">NEW</span>
                            </li>
                            <li>sample2</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-black">Legal</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                <Link href="/privacy-policy" className="hover:text-hoverprimary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/termsofservices" className="hover:text-hoverprimary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;