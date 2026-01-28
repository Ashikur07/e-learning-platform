import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";
import EnrollClassCard from "./EnrollClassCard";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { motion } from "framer-motion";

const EnrollClass = () => {
    useEffect(() => {
        document.title = 'Dashboard | My Enroll Class';
    }, []);

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const limit = 6; // Proti page-e 6-ti card dekhabe

    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments?studentEmail=${user?.email}`);
            return res.data;
        }
    });

    const totalPages = Math.ceil(classes.length / limit);
    const currentData = classes.slice((page - 1) * limit, page * limit);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pb-24 bg-base-100 min-h-screen transition-colors duration-300"
        >
            <div className="pt-8">
                <Heading 
                    title="My Learning" 
                    subtitle="Track your progress and continue your transformative education journey." 
                />
            </div>

            {/* Empty State */}
            {!isLoading && currentData.length === 0 && (
                <div className="text-center py-20 opacity-40">
                    <p className="text-xl font-bold uppercase tracking-[0.3em] italic">No classes enrolled yet.</p>
                </div>
            )}

            {/* Grid Container */}
            <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-8 mt-10">
                {currentData.map(clas => (
                    <EnrollClassCard key={clas._id} clas={clas} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16 transition-all">
                    <button
                        onClick={() => {setPage(prev => Math.max(prev - 1, 1)); window.scrollTo({top: 0, behavior: 'smooth'});}}
                        className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20 shadow-md"
                        disabled={page === 1}
                    > &larr; </button>

                    <div className="flex gap-2 bg-base-200 p-1.5 rounded-full border border-base-300 shadow-inner">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => {setPage(pageNumber); window.scrollTo({top: 0, behavior: 'smooth'});}}
                                className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                                    pageNumber === page 
                                    ? 'bg-primary text-white shadow-lg scale-110' 
                                    : 'text-base-content/40 hover:bg-base-300 hover:text-base-content'
                                }`}
                            > {pageNumber} </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {setPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({top: 0, behavior: 'smooth'});}}
                        className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20 shadow-md"
                        disabled={page === totalPages}
                    > &rarr; </button>
                </div>
            )}
        </motion.div>
    );
};

export default EnrollClass;