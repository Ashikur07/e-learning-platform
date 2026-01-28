import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaTags, FaEnvelope } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const ClassDetails = () => {
    const classes = useLoaderData();

    return (
        // bg-white bad diye bg-base-100 kora holo theme adaptation er jonno
        <div className="min-h-screen bg-base-100 text-base-content pt-24 pb-16 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto"> 
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    // bg-white bad diye bg-base-200 kora holo jate background theke ektu alada hoy
                    className="bg-base-200 rounded-[2rem] overflow-hidden shadow-2xl border border-base-300 flex flex-col md:flex-row items-stretch transition-all"
                >
                    
                    {/* Left Side: Compact Image */}
                    <div className="md:w-[45%] relative group overflow-hidden"> 
                        <img 
                            className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src={classes?.image} 
                            alt={classes.title} 
                        />
                        {/* Price Tag with adaptive backdrop */}
                        <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-lg border border-base-300">
                            <p className="text-primary font-black text-lg">${classes.price}</p>
                        </div>
                    </div>

                    {/* Right Side: Sleek Content */}
                    <div className="md:w-[55%] p-8 lg:p-12 flex flex-col justify-center space-y-6">
                        
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Premium Course
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tighter text-base-content">
                                {classes.title}
                            </h1>
                        </div>

                        <p className="text-sm md:text-base opacity-70 font-medium leading-relaxed line-clamp-4">
                            {classes.description}
                        </p>

                        {/* Stats Row with adaptive colors */}
                        <div className="flex items-center gap-8 py-5 border-y border-base-300">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center text-sm shadow-inner">
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <p className="text-lg font-black">{classes.enrolment}</p>
                                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-wider">Enrolled</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center text-sm shadow-inner">
                                    <FaTags />
                                </div>
                                <div>
                                    <p className="text-lg font-black">${classes.price}</p>
                                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-wider">Course Fee</p>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Row with Profile Box */}
                        <div className="flex items-center gap-4 p-4 bg-base-100/50 rounded-2xl border border-base-300 shadow-sm">
                            <img 
                                className="rounded-xl w-12 h-12 object-cover ring-2 ring-primary/20 shadow-md transition-transform group-hover:rotate-6" 
                                src={classes?.photoURL || "https://i.ibb.co/FbjVmqc/3237472.png"} 
                                alt={classes?.name} 
                            />
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm truncate">{classes?.name}</p>
                                <p className="text-[10px] font-medium opacity-50 truncate italic">{classes?.email}</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link to={`/payment/${classes._id}`}>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full md:w-max px-10 py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 group text-sm uppercase tracking-widest active:scale-95 transition-all"
                                >
                                    Proceed to Payment
                                    <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ClassDetails;