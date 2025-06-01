import { Facebook, X, Instagram, Youtube, Linkedin } from 'lucide-react';

const copyright = () => {
    return (
        <div className="w-full bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto text-primarytext px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center">
                    <img
                        src="/tensorGlade-logo.svg"
                        alt="TensorGlade Logo"
                        className="h-6"
                    />
                </div>

                <div className="flex items-center text-sm">
                    © Copyright Tensorglade 2025 – All rights reserved
                </div>

                <div className="flex items-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                        <Facebook size={20} />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                        <X size={20} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                        <Instagram size={20} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                        <Youtube size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default copyright;