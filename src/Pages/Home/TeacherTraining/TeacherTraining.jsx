import { motion } from "framer-motion";

const TeacherTraining = () => {
    const trainingFeatures = [
        {
            icon: "https://i.ibb.co/MpkqHFw/image.png",
            text: "Teachers don’t get lost in the grid view and have a dedicated Podium space."
        },
        {
            icon: "https://i.ibb.co/CWpBzB3/image.png",
            text: "TA’s and presenters can be moved to the front of the class."
        },
        {
            icon: "https://i.ibb.co/XyjBVxD/image.png",
            text: "Teachers can easily see all students and class data at one time."
        }
    ];

    // Animation Variants for Feature Cards
    const cardContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Protiti feature card-er delay
            }
        }
    };

    const cardItemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="py-20 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    
                    {/* Left Side: Image with Scale & Fade Entry */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 w-full group"
                    >
                        <div className="relative">
                            {/* Decorative background circle with Motion */}
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"
                            ></motion.div>
                            
                            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-base-200">
                                <motion.img 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7 }}
                                    className="w-full h-auto object-cover" 
                                    src="https://i.ibb.co/qdbwQgV/image.png" 
                                    alt="Teacher Training Illustration" 
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Features Content */}
                    <div className="flex-1 space-y-8">
                        {/* Heading Animation */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6 }}
                            className="space-y-3"
                        >
                            <p className="text-orange-500 font-black uppercase tracking-widest text-sm italic">Training Program</p>
                            <h2 className="text-4xl lg:text-6xl font-black text-base-content leading-tight">
                                Advanced <br />
                                <span className="text-orange-500">Teacher Training</span>
                            </h2>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: 80 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-1.5 bg-orange-500 rounded-full"
                            ></motion.div>
                        </motion.div>

                        {/* Staggered Feature List */}
                        <motion.div 
                            variants={cardContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            className="space-y-6"
                        >
                            {trainingFeatures.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={cardItemVariants}
                                    whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                                    className="flex items-start gap-5 p-5 bg-base-200/40 rounded-3xl border border-base-300/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
                                >
                                    {/* Icon Container */}
                                    <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-md flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                                        <img src={feature.icon} alt="Icon" className="w-full h-full object-contain" />
                                    </div>

                                    {/* Text Content */}
                                    <p className="text-base-content/80 text-sm lg:text-base font-semibold leading-relaxed pt-1">
                                        {feature.text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeacherTraining;