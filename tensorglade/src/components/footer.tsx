import React from "react";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 py-0 px-2 md:items-center md:px-10 lg:px-32">
            <div className="text-5xl md:text-9xl font-bold text-center text-orange-500 mb-10">
                TensorGlade
            </div>

            <div className="w-full mx-auto grid grid-cols-6 md:grid-cols-4 lg:grid-cols-4 gap-10">

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Company</h3>
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
                    <h3 className="font-bold text-lg text-black mb-4">Our Products</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Product 1</li>
                        <li>Product 2</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Case Studies</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>sample1
                            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">NEW</span>
                        </li>
                        <li>sample2</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Legal</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <Link href="/privacypolicy" className="hover:text-hoverprimary transition-colors">
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
        </footer>
    );
};

export default Footer;
