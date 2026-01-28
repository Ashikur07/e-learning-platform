import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import MyCourseCard from "./MyCourseCard";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyClass = () => {
    useEffect(() => {
        document.title = 'Dashboard | My Class';
    }, []);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 6; // Compact view for instructors

    const currentTheme = localStorage.getItem("theme") || "light";

    const { data: classes = [], refetch, isLoading } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const matchClass = classes.filter(clas => clas?.email === user?.email);
    const totalPages = Math.ceil(matchClass.length / limit);
    const currentData = matchClass.slice((page - 1) * limit, page * limit);

    const handleDelete = id => {
        Swal.fire({
            title: 'Delete this course?',
            text: "This action is permanent and cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!',
            background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
            color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted!',
                                icon: 'success',
                                background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                                color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pb-24 bg-base-100 min-h-screen transition-colors duration-300"
        >
            <div className="pt-8">
                <Heading 
                    title="Instructor Courses" 
                    subtitle="Monitor status, update content, or manage enrollment for your created classes." 
                />
            </div>

            {/* Empty State */}
            {!isLoading && currentData.length === 0 && (
                <div className="text-center py-20 opacity-30">
                    <p className="text-xl font-black uppercase tracking-[0.3em] italic">No classes found.</p>
                </div>
            )}

            {/* Grid Container */}
            <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-8 mt-10 transition-all">
                {currentData.map(clas => (
                    <MyCourseCard key={clas._id} clas={clas} handleDelete={handleDelete} />
                ))}
            </div>

            {/* Premium Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16 transition-all">
                    <button
                        onClick={() => {setPage(prev => Math.max(prev - 1, 1)); window.scrollTo(0,0);}}
                        className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20 shadow-md"
                        disabled={page === 1}
                    > &larr; </button>

                    <div className="flex gap-2 bg-base-200 p-2 rounded-full border border-base-300 shadow-inner">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => {setPage(pageNumber); window.scrollTo(0,0);}}
                                className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                                    pageNumber === page 
                                    ? 'bg-primary text-white shadow-lg scale-110' 
                                    : 'text-base-content/40 hover:bg-base-300'
                                }`}
                            > {pageNumber} </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {setPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo(0,0);}}
                        className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20 shadow-md"
                        disabled={page === totalPages}
                    > &rarr; </button>
                </div>
            )}
        </motion.div>
    );
};

export default MyClass;