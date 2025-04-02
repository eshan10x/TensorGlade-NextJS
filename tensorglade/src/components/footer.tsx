import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 py-10 px-6 md:items-center md:px-20 lg:px-32">
            <div className="text-5xl md:text-9xl font-bold text-center text-orange-500 mb-10">
                TensorGlade
            </div>

            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Products</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Employer of Record</li>
                        <li>Global Payroll</li>
                        <li>Agent of Record</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Solutions</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="text-gray-400">By use case</li>
                        <li>Expand globally</li>
                        <li>Stay compliant</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Resources</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>Customer stories</li>
                        <li>What is EOR</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                            About us
                            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">NEW</span>
                        </li>
                        <li className="flex items-center">
                            Beyond borders
                            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">NEW</span>
                        </li>
                        <li>Careers</li>
                    </ul>
                </div>

            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Strategic partners</h3>
                    <p className="text-gray-700">Multiplier + TriNet</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-black mb-4">Get help</h3>
                    <p className="text-gray-700">Help center</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
