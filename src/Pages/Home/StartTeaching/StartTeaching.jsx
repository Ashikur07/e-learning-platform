import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const StartTeaching = () => {
    return (
        <section className="my-28 px-4 lg:px-0 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Title Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-6xl font-black text-base-content tracking-tight">
                        Become an <span className="text-primary italic">Instructor</span>
                    </h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1.5 bg-primary mx-auto mt-4 rounded-full"
                    ></motion.div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Left Side: Image with Slide-in Animation */}
                    <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 w-full group"
                    >
                        <div className="relative">
                            {/* Decorative background shape */}
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                            
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10 w-full h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-2xl" 
                                src="https://i.ibb.co/MRrqVqW/Improving-teaching-styles.png" 
                                alt="Teaching Style" 
                            />
                            
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                        </div>
                    </motion.div>

                    {/* Right Side: Content with Slide-in & Stagger */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-6 text-center lg:text-left"
                    >
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl lg:text-4xl font-extrabold text-base-content leading-tight"
                        >
                            Teach on Your Own <br className="hidden lg:block" />
                            <span className="text-primary">Schedule & Terms</span>
                        </motion.h3>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.4 }}
                            className="text-base-content/70 text-lg leading-relaxed font-medium"
                        >
                            Enjoy the flexibility to teach when it suits you. Whether you prefer part-time or full-time teaching, our platform accommodates your availability. Create your own schedule, choose the hours you want to work, and balance teaching with other commitments.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.6 }}
                            className="pt-4"
                        >
                            <Link 
                                to='/teaching' 
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group"
                            >
                                Start Teaching Today
                                <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        
                        {/* Simple feature list with Staggered Entrance */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.2, delayChildren: 0.8 }
                                }
                            }}
                            className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 opacity-60 text-sm font-bold uppercase tracking-widest"
                        >
                            {["Flexible Hours", "Global Reach", "Easy Tools"].map((item, idx) => (
                                <motion.span 
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    ✓ {item}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StartTeaching;