import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

const TeacherRequest = () => {
    useEffect(() => { document.title = 'Dashboard | Instructor Requests'; }, []);

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: applyers = [], refetch } = useQuery({
        queryKey: ['applyers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applyforTeaching');
            return res.data;
        }
    });

    const totalPages = Math.ceil(applyers.length / limit);
    const currentData = applyers.slice((page - 1) * limit, page * limit);

    const handleMakeTeacher = (userId, requestId) => {
        axiosSecure.patch(`/users/teacher/${userId}`, { role: 'teacher' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    axiosSecure.patch(`/applyforTeaching/teacher/${requestId}`, { status: 'accepted' })
                        .then(() => {
                            refetch();
                            Swal.fire({ title: "Approved!", text: "Instructor role granted.", icon: "success", timer: 1500 });
                        });
                }
            });
    }

    const handleRejected = id => {
        axiosSecure.patch(`/applyforTeaching/teacher/${id}`, { status: 'rejected' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({ title: "Rejected", text: "Application declined.", icon: "error", timer: 1500 });
                }
            });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pb-24 px-4 lg:px-8 bg-base-100 min-h-screen text-base-content"
        >
            <div className="pt-8">
                <Heading title="Teacher Requests" subtitle="Review instructor applications with full visibility control." />
            </div>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Header with proper contrast */}
                        <thead className="bg-base-200 text-base-content/70">
                            <tr className="border-b border-base-300">
                                <th className="py-6 pl-8 font-black uppercase tracking-widest text-[11px]">Applicant</th>
                                <th className="font-black uppercase tracking-widest text-[11px]">Professional Info</th>
                                <th className="font-black uppercase tracking-widest text-[11px]">Status</th>
                                <th className="text-center font-black uppercase tracking-widest text-[11px]">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-base-300">
                            {currentData.map((applyer) => (
                                <tr key={applyer._id} className="hover:bg-base-200/40 transition-colors group">
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 bg-base-300 shadow-sm">
                                                    <img src={applyer.image || "https://i.ibb.co/FbjVmqc/3237472.png"} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{applyer.name}</div>
                                                <div className="text-[10px] opacity-60 font-bold uppercase tracking-wider">{applyer.category}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="text-sm font-bold text-base-content line-clamp-1 max-w-[200px]">{applyer.title}</div>
                                        <div className="text-[10px] opacity-50 italic">{applyer.experience} level</div>
                                    </td>

                                    <td>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                                            applyer.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                            applyer.status === 'rejected' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                                            'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {applyer.status}
                                        </span>
                                    </td>

                                    {/* FIXED Action Column: Buttons always visible even in Dark Mode */}
                                    <td>
                                        <div className="flex justify-center items-center gap-4">
                                            <button 
                                                onClick={() => handleMakeTeacher(applyer.userId, applyer._id)}
                                                disabled={applyer.status === 'accepted' || applyer.status === 'rejected'}
                                                className={`btn btn-sm btn-circle border-none transition-all shadow-lg ${
                                                    applyer.status === 'accepted' 
                                                    ? 'bg-base-300 text-base-content/20' 
                                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-110 shadow-emerald-500/20'
                                                }`}
                                            >
                                                <FaUserCheck size={16} />
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleRejected(applyer._id)}
                                                disabled={applyer.status === 'accepted' || applyer.status === 'rejected'}
                                                className={`btn btn-sm btn-circle border-none transition-all shadow-lg ${
                                                    applyer.status === 'rejected' 
                                                    ? 'bg-base-300 text-base-content/20' 
                                                    : 'bg-rose-600 text-white hover:bg-rose-700 hover:scale-110 shadow-rose-500/20'
                                                }`}
                                            >
                                                <FaUserTimes size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination with fixed dark mode buttons */}
            <div className="flex justify-center items-center gap-3 mt-12 mb-10">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="btn btn-circle bg-base-200 border-base-300 text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                    disabled={page === 1}
                > &larr; </button>

                <div className="flex gap-2 bg-base-200 p-2 rounded-full border border-base-300">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                                pageNumber === page 
                                ? 'bg-primary text-white shadow-lg scale-110' 
                                : 'bg-base-100 text-base-content/50 hover:bg-base-300'
                            }`}
                        > {pageNumber} </button>
                    ))}
                </div>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="btn btn-circle bg-base-200 border-base-300 text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                    disabled={page === totalPages}
                > &rarr; </button>
            </div>
        </motion.div>
    );
};

export default TeacherRequest;