import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Test = () => {
    return (
        <div className="bg-purple-900 text-white w-full relative font-sans">
            {/* Header */}
            <div className="container mx-auto py-4 px-8 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                        <FiPhone />
                        <span>+01 (977) 2599 12</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MdEmail />
                        <span>company@domain.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MdLocationOn />
                        <span>3146 Koontz Lane, California</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FaFacebookF />
                    <FaTwitter />
                    <FaYoutube />
                    <FaInstagram />
                    <FaLinkedinIn />
                </div>
            </div>

            {/* Navbar */}
            <div className="container mx-auto flex items-center justify-between px-8 py-4">
                <div className="text-3xl font-bold">Educator</div>
                <div className="flex space-x-6">
                    <a href="#home" className="hover:text-pink-500">HOME</a>
                    <a href="#about" className="hover:text-pink-500">ABOUT US</a>
                    <a href="#pages" className="hover:text-pink-500">PAGES</a>
                    <a href="#blog" className="hover:text-pink-500">BLOG</a>
                    <a href="#shop" className="hover:text-pink-500">SHOP</a>
                    <a href="#contact" className="hover:text-pink-500">CONTACT</a>
                </div>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md">BUY NOW</button>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto flex justify-between items-center py-12 px-8 lg:px-0 lg:max-w-7xl">
                {/* Text Content */}
                <div className="text-content w-1/2">
                    <h1 className="text-5xl font-bold mb-4">
                        Providing Best Education For Brighter Future
                    </h1>
                    <p className="text-base mb-6">
                        Per sed, mattis. Integer viverra euismod maecenas incidunt, phasellus consequat aliquam nihil temporibus in assumens deserunt convalis. Inceptos per consectetur consequat proin.
                    </p>
                    <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-bold">
                        Learn More
                    </button>
                </div>
                {/* Image Content */}
                <div className="image-content relative w-1/2 flex justify-end">
                    <img
                        src="/images/educator-img33.png"
                        alt="Student Image"
                        className="rounded-lg"
                        style={{ maxHeight: '500px' }}
                    />
                </div>
            </div>

            {/* Buy Now Floating Button */}
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-bold absolute right-10 top-1/2 transform -translate-y-1/2">
                BUY NOW
            </button>
        </div>
    );
};

export default Test;
