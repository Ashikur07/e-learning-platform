import Lottie from "lottie-react";
import contract from "../../../assets/contract.json";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { motion } from "framer-motion";

const Contract = () => {
    return (
        <section className="py-20 lg:py-32 px-4 lg:px-0 bg-base-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Modern Flex Card with Framer Motion */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-base-200/40 border border-base-300 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                    <div className="flex flex-col lg:flex-row items-center">
                        
                        {/* Left Side: Text Content with Slide-in Animation */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 p-10 lg:p-20 text-center lg:text-left space-y-6 order-2 lg:order-1"
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
                            >
                                <span className="text-primary font-bold text-xs uppercase tracking-widest italic">Contact Support</span>
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl lg:text-6xl font-black text-base-content leading-tight tracking-tight"
                            >
                                Reach Out <br /> 
                                <span className="text-primary">To Us Anytime!</span>
                            </motion.h2>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.4 }}
                                className="text-base-content/60 text-lg font-medium max-w-md"
                            >
                                Have a question or just want to say hi? We're always here to help you on your journey with LearnQuest.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.5 }}
                                className="pt-4"
                            >
                                <Link to='/contract'>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-3 bg-base-content text-base-100 hover:bg-primary hover:text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                                    >
                                        <HiOutlineMailOpen className="text-2xl group-hover:rotate-12 transition-transform" />
                                        Send a Message
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: Animation Area with Slide-in from Right */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 bg-primary/5 w-full flex justify-center items-center p-10 lg:p-0 order-1 lg:order-2 self-stretch"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="w-full max-w-[280px] lg:max-w-[400px]"
                            >
                                <Lottie 
                                    animationData={contract} 
                                    loop={true}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contract;