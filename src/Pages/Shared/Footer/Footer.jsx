import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#00152e] text-slate-300 relative overflow-hidden">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3">
                            <img 
                                className="w-12 h-12 rounded-xl border border-white/10 shadow-lg" 
                                src="https://i.ibb.co/rxmN4Qx/360-F-507665856-d-FXIKJJ4-Sw-ROG0df8-GNPBhqs-ZV44p6jn.jpg" 
                                alt="LearnQuest Logo" 
                            />
                            <h2 className="text-2xl font-black tracking-tighter text-white">LearnQuest</h2>
                        </div>
                        <p className="text-sm leading-relaxed opacity-70 max-w-xs">
                            Empowering future tech leaders since 1992. Join our community of 50k+ learners and start your journey today.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10">
                                <FaFacebook />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10">
                                <FaTwitter />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10">
                                <FaInstagram />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links: Services */}
                    <div className="text-center md:text-left">
                        <h6 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h6>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Web Development</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">UI/UX Design</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Data Science</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Cloud Computing</a></li>
                        </ul>
                    </div>

                    {/* Quick Links: Company */}
                    <div className="text-center md:text-left">
                        <h6 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Company</h6>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Our Mentors</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Career</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="text-center md:text-left">
                        <h6 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Subscribe</h6>
                        <p className="text-sm opacity-70 mb-6">Get the latest course updates and tech news in your inbox.</p>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Email address" 
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-primary/50 transition-all"
                            />
                            <button className="absolute right-2 top-2 h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/80 transition-all">
                                <FaPaperPlane className="text-xs" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs opacity-50">
                        © 2026 LearnQuest. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs opacity-50 font-bold uppercase tracking-tighter">
                        <a className="hover:text-white cursor-pointer transition-colors">Privacy Policy</a>
                        <a className="hover:text-white cursor-pointer transition-colors">Terms of Use</a>
                        <a className="hover:text-white cursor-pointer transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;