import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaTags, FaEnvelope } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const ClassDetails = () => {
    const classes = useLoaderData();

    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4">
            <div className="max-w-5xl mx-auto"> {/* Container soto kora holo */}
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row items-stretch"
                >
                    
                    {/* Left Side: Compact Image */}
                    <div className="md:w-[45%] relative group"> {/* Width soto kora holo */}
                        <img 
                            className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src={classes?.image} 
                            alt={classes.title} 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-sm">
                            <p className="text-primary font-black text-lg">${classes.price}</p>
                        </div>
                    </div>

                    {/* Right Side: Sleek Content */}
                    <div className="md:w-[55%] p-8 lg:p-12 flex flex-col justify-center space-y-6">
                        
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest">
                                Premium Course
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tighter">
                                {classes.title}
                            </h1>
                        </div>

                        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                            {classes.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-8 py-4 border-y border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-sm">
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <p className="text-lg font-black text-slate-900">{classes.enrolment}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Enrolled</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-sm">
                                    <FaTags />
                                </div>
                                <div>
                                    <p className="text-lg font-black text-slate-900">${classes.price}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Course Fee</p>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Row */}
                        <div className="flex items-center gap-4 pt-2">
                            <img 
                                className="rounded-xl w-12 h-12 object-cover ring-2 ring-gray-50 shadow-sm" 
                                src={classes?.photoURL || "https://i.ibb.co/FbjVmqc/3237472.png"} 
                                alt={classes?.name} 
                            />
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm text-slate-900 truncate">{classes?.name}</p>
                                <p className="text-[10px] font-medium text-slate-400 truncate">{classes?.email}</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link to={`/payment/${classes._id}`}>
                                <motion.button 
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full md:w-max px-10 py-4 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 group text-sm"
                                >
                                    Proceed to Payment
                                    <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
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