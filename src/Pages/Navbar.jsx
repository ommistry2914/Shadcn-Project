import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-xl font-bold text-gray-900 dark:text-white">Brand</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-18">
                        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
                        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</a>
                        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Services</a>
                        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</a>
                    </div>

                    <div className="flex items-center space-x-4">

                        <Button variant="outline">Logout</Button>
                        {/* Profile Pic and Logout Button */}
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />

                        {/* Mobile Menu Button */}
                        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Home</a>
                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">About</a>
                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Services</a>
                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Contact</a>
                    <div className="flex items-center space-x-4 mt-4">

                        <Button variant="outline">Logout</Button>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
