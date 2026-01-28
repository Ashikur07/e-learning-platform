import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaChartLine } from "react-icons/fa";

const AllClass = () => {
    useEffect(() => {
        document.title = 'Dashboard | All Classes';
    }, []);

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: classes = [], refetch, isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const totalPages = Math.ceil(classes.length / limit);
    const currentData = classes.slice((page - 1) * limit, page * limit);

    const handleApproves = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'accepted', enrolment: 0, assignmentSubmited: 0 })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({ title: "Approved!", icon: "success", timer: 1500, showConfirmButton: false });
                }
            });
    };

    const handleRejected = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'rejected', enrolment: 0, assignmentSubmited: 0 })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({ title: "Rejected!", icon: "error", timer: 1500, showConfirmButton: false });
                }
            });
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pb-24 px-4 lg:px-8 bg-base-100 min-h-screen"
        >
            <div className="pt-8">
                <Heading title="Course Management" subtitle="Approve or reject instructor class requests" />
            </div>

            {/* Table Container */}
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-base-200 text-base-content/70">
                            <tr className="border-b border-base-300">
                                <th className="py-5 pl-8">Course Info</th>
                                <th>Instructor</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-base-content/80">
                            {currentData.map((clas) => (
                                <tr key={clas._id} className="hover:bg-base-200/50 transition-colors border-b border-base-300/50">
                                    <td className="py-4 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 shadow-md">
                                                    <img src={clas.image} alt="Course" />
                                                </div>
                                            </div>
                                            <div className="max-w-[250px]">
                                                <div className="font-black text-slate-900 dark:text-white truncate">{clas.title}</div>
                                                <div className="text-xs opacity-50 line-clamp-1">{clas.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-sm">{clas.email}</div>
                                        <div className="text-[10px] uppercase font-bold text-primary italic">Instructor Email</div>
                                    </td>
                                    <td>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            clas.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                            clas.status === 'rejected' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                            {clas.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            {/* Approve Button */}
                                            <button 
                                                onClick={() => handleApproves(clas._id)}
                                                disabled={clas.status === 'accepted' || clas.status === 'rejected'}
                                                className={`btn btn-sm btn-circle ${clas.status === 'accepted' ? 'btn-disabled opacity-30' : 'btn-success text-white shadow-lg shadow-emerald-500/20'}`}
                                                title="Approve"
                                            >
                                                <FaCheck size={12} />
                                            </button>

                                            {/* Reject Button */}
                                            <button 
                                                onClick={() => handleRejected(clas._id)}
                                                disabled={clas.status === 'accepted' || clas.status === 'rejected'}
                                                className={`btn btn-sm btn-circle ${clas.status === 'rejected' ? 'btn-disabled opacity-30' : 'btn-error text-white shadow-lg shadow-rose-500/20'}`}
                                                title="Reject"
                                            >
                                                <FaTimes size={12} />
                                            </button>

                                            {/* Progress Button */}
                                            <button className="btn btn-sm px-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 border-none shadow-lg shadow-indigo-500/20 gap-2 text-[10px] uppercase font-bold">
                                                <FaChartLine /> Progress
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modern Pagination */}
            <div className="flex justify-center items-center gap-3 mt-12">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="btn btn-circle btn-ghost border border-base-300 bg-base-100 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                    disabled={page === 1}
                > &larr; </button>

                <div className="flex gap-2 bg-base-200 p-1.5 rounded-full border border-base-300 shadow-inner">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`w-10 h-10 rounded-full font-black text-xs transition-all ${pageNumber === page ? 'bg-primary text-white shadow-md scale-110' : 'hover:bg-base-300'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="btn btn-circle btn-ghost border border-base-300 bg-base-100 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                    disabled={page === totalPages}
                > &rarr; </button>
            </div>
        </motion.div>
    );
};

export default AllClass;