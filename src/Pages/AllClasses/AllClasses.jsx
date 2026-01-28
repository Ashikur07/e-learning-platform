import axios from "axios";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const AllClasses = () => {
    useEffect(() => { document.title = 'Explore Catalog | LearnQuest'; }, []);

    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 6; 

    useEffect(() => {
        setLoading(true);
        axios(`${import.meta.env.VITE_API_URL}/classes`)
            .then(res => {
                setClasses(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const adminAproveClasses = classes.filter(clas => clas.status === 'accepted');
    const totalPages = Math.ceil(adminAproveClasses.length / limit);
    const currentData = adminAproveClasses.slice((page - 1) * limit, page * limit);

    // Dynamic Skeleton for Dark/Light Mode
    const CardSkeleton = () => (
        <div className="bg-base-200 rounded-[2.5rem] p-4 border border-base-300 animate-pulse h-[500px]">
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
        <div className="min-h-screen bg-base-100 text-base-content pb-28 pt-20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                {/* Header Section with Adaptive Borders */}
                <header className="relative mb-16 border-b border-base-300 pb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-6 bg-primary"></span>
                                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                                    Learning Catalog
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
                                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">Potential</span>
                            </h1>

                            <p className="text-sm md:text-base opacity-60 font-medium max-w-lg leading-relaxed">
                                Browse through our world-class courses and embark on a transformative learning journey today.
                            </p>
                        </motion.div>

                        <div className="flex items-center gap-3">
                            <button className="btn btn-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                All Courses
                            </button>
                            <button className="btn btn-ghost btn-square rounded-xl bg-base-200 border-base-300">
                                <HiOutlineAdjustmentsHorizontal className="w-5 h-5 opacity-60" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {currentData.map((clas, index) => (
                                <ClassCard key={clas._id} clas={clas} index={index} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Adaptive Pagination */}
                {!loading && (
                    <div className="flex justify-center items-center gap-4 mt-28">
                        <button 
                            onClick={() => {setPage(p => Math.max(p-1, 1)); window.scrollTo(0,0);}}
                            className="btn btn-circle btn-ghost border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20"
                            disabled={page === 1}
                        > &larr; </button>
                        
                        <div className="flex gap-2 bg-base-200 p-2 rounded-full border border-base-300 shadow-inner">
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => {setPage(i+1); window.scrollTo(0,0);}}
                                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full font-black text-sm lg:text-lg transition-all ${
                                        page === i+1 
                                        ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110' 
                                        : 'hover:bg-base-300 text-base-content/60'
                                    }`}
                                > {i+1} </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => {setPage(p => Math.min(p+1, totalPages)); window.scrollTo(0,0);}}
                            className="btn btn-circle btn-ghost border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20"
                            disabled={page === totalPages}
                        > &rarr; </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;