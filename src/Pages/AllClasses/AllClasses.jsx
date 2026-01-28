import axios from "axios";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const AllClasses = () => {
    useEffect(() => { document.title = 'Explore Catalog | LearnQuest'; }, []);

    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state added
    const limit = 6; 

    useEffect(() => {
        setLoading(true);
        axios(`${import.meta.env.VITE_API_URL}/classes`)
            .then(res => {
                setClasses(res.data);
                setLoading(false); // Data load shesh
            })
            .catch(() => setLoading(false));
    }, []);

    const adminAproveClasses = classes.filter(clas => clas.status === 'accepted');
    const totalPages = Math.ceil(adminAproveClasses.length / limit);
    const currentData = adminAproveClasses.slice((page - 1) * limit, page * limit);

    // Card Skeleton UI
    const CardSkeleton = () => (
        <div className="bg-base-200/50 rounded-[2.5rem] p-4 border border-base-200 animate-pulse h-[500px]">
            <div className="bg-base-300 rounded-[2rem] h-56 w-full"></div>
            <div className="p-4 space-y-4">
                <div className="h-4 bg-base-300 rounded w-1/3"></div>
                <div className="h-6 bg-base-300 rounded w-3/4"></div>
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-16 bg-base-300 rounded-2xl w-full mt-4"></div>
                <div className="h-12 bg-base-300 rounded-2xl w-full"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-28 pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                <header className="relative mb-16 border-b border-gray-100 pb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-6 bg-indigo-600"></span>
                                <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                                    Learning Catalog
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
                                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Potential</span>
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 font-medium max-w-lg">
                                Browse through our world-class courses and embark on a transformative learning journey today.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3"
                        >
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-sm uppercase tracking-wider">
                                All Courses
                            </button>
                            <button className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all">
                                <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-slate-500" />
                            </button>
                        </motion.div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {loading ? (
                        // Load hote thakle skeleton dekhabe
                        Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {currentData.map((clas, index) => (
                                <ClassCard key={clas._id} clas={clas} index={index} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Pagination (Baki code same) */}
                {!loading && (
                    <div className="flex justify-center items-center gap-4 mt-28">
                        <button 
                            onClick={() => {setPage(p => Math.max(p-1, 1)); window.scrollTo(0,0);}}
                            className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"
                            disabled={page === 1}
                        > &larr; </button>
                        
                        <div className="flex gap-3 bg-slate-50 p-2 rounded-full border border-slate-100">
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => {setPage(i+1); window.scrollTo(0,0);}}
                                    className={`w-12 h-12 rounded-full font-black text-lg transition-all ${page === i+1 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110' : 'hover:bg-slate-200'}`}
                                > {i+1} </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => {setPage(p => Math.min(p+1, totalPages)); window.scrollTo(0,0);}}
                            className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"
                            disabled={page === totalPages}
                        > &rarr; </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;