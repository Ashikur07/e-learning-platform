import { useEffect } from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTelegramPlane, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
    useEffect(() => {
        document.title = 'Contact Us | LearnQuest';
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-12 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-3"
                >
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase">Get In Touch</h1>
                    <p className="text-slate-400 font-medium italic max-w-lg mx-auto">We're here to help you on your journey. Reach out anytime.</p>
                    <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-stretch gap-0 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100">
                    
                    {/* Left Side: Google Map Integration (IU, Kushtia) */}
                    <div className="lg:w-[55%] min-h-[450px] relative grayscale hover:grayscale-0 transition-all duration-1000">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.123456789!2d89.1461!3d23.7224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fed9729a997d93%3A0x6e269223e9a4f783!2sIslamic%20University!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Islamic University Location"
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    {/* Right Side: Sleek Slate-Indigo Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-[45%] p-10 lg:p-14 bg-slate-900 text-white flex flex-col justify-center space-y-10 relative"
                    >
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 space-y-8">
                            <h2 className="text-2xl font-black tracking-tight border-b border-slate-700 pb-4 uppercase">Office Info</h2>
                            
                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex gap-5 items-start">
                                    <div className="bg-slate-800 p-4 rounded-2xl shadow-inner border border-slate-700">
                                        <FaMapMarkerAlt className="text-xl text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Our Location</p>
                                        <p className="text-lg font-bold leading-tight">Islamic University, Kushtia-7003, Bangladesh</p>
                                    </div>
                                </div>

                                {/* Support */}
                                <div className="flex gap-5 items-start">
                                    <div className="bg-slate-800 p-4 rounded-2xl shadow-inner border border-slate-700">
                                        <FaEnvelope className="text-xl text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Email Support</p>
                                        <p className="text-lg font-bold">support@learnquest-iu.com</p>
                                    </div>
                                </div>

                                {/* Helpline */}
                                <div className="flex gap-5 items-start">
                                    <div className="bg-slate-800 p-4 rounded-2xl shadow-inner border border-slate-700">
                                        <FaPhoneAlt className="text-xl text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Helpline</p>
                                        <p className="text-2xl font-black tracking-tighter">01322-901105</p>
                                        <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Sat - Thu, 10 AM - 7 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="pt-8 flex gap-4">
                                <motion.a whileHover={{ y: -5 }} href="#" className="h-12 w-12 bg-slate-800 text-white rounded-xl flex items-center justify-center text-xl shadow-lg border border-slate-700 hover:bg-indigo-600 transition-all"><FaFacebookF /></motion.a>
                                <motion.a whileHover={{ y: -5 }} href="#" className="h-12 w-12 bg-slate-800 text-white rounded-xl flex items-center justify-center text-xl shadow-lg border border-slate-700 hover:bg-indigo-600 transition-all"><BsTwitter /></motion.a>
                                <motion.a whileHover={{ y: -5 }} href="#" className="h-12 w-12 bg-slate-800 text-white rounded-xl flex items-center justify-center text-xl shadow-lg border border-slate-700 hover:bg-indigo-600 transition-all"><FaTelegramPlane /></motion.a>
                                <motion.a whileHover={{ y: -5 }} href="#" className="h-12 w-12 bg-slate-800 text-white rounded-xl flex items-center justify-center text-xl shadow-lg border border-slate-700 hover:bg-indigo-600 transition-all"><BsInstagram /></motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;