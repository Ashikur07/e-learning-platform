import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUserShield, FaUserGraduate } from "react-icons/fa";

const Users = () => {
    useEffect(() => {
        document.title = 'Dashboard | User Management';
    }, []);

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Filtering out admins so we don't accidentally demote them here
    const normalUser = users.filter(usr => usr?.role !== "admin");
    const totalPages = Math.ceil(normalUser.length / limit);
    const currentData = normalUser.slice((page - 1) * limit, page * limit);

    const handleMakeAdmin = id => {
        // Theme check (localStorage theke theme value nite hobe)
        const currentTheme = localStorage.getItem("theme") || "light";
    
        Swal.fire({
            title: "Elevate to Admin?",
            text: "This user will gain full administrative privileges.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1", // Indigo primary
            cancelButtonColor: "#ef4444", // Rose/Red
            confirmButtonText: "Yes, grant access",
            
            // DYNAMIC COLORS HERE
            background: currentTheme === 'dark' ? '#1e293b' : '#ffffff', // Dark slate vs White
            color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a', // Light text vs Dark text
            
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/teacher/${id}`, { role: 'admin' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Promoted!",
                                icon: "success",
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
            className="pb-24 px-4 lg:px-8 bg-base-100 min-h-screen transition-colors duration-300"
        >
            <div className="pt-8">
                <Heading 
                    title="User Directory" 
                    subtitle="Manage community roles and grant administrative access." 
                />
            </div>

            {/* Modern Table Container */}
            <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-base-300 bg-base-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-base-content/70">
                            <tr className="border-b border-base-300">
                                <th className="py-6 pl-8 font-black uppercase tracking-widest text-[10px]">User Profile</th>
                                <th className="font-black uppercase tracking-widest text-[10px]">Account Email</th>
                                <th className="font-black uppercase tracking-widest text-[10px] text-center">Status</th>
                                <th className="text-center font-black uppercase tracking-widest text-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-base-content/90 font-medium">
                            {currentData.map((user) => (
                                <tr key={user._id} className="hover:bg-base-200/50 transition-colors border-b border-base-300/40">
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 bg-base-300 shadow-sm transition-transform hover:scale-105">
                                                    <img src={user.image || "https://i.ibb.co/FbjVmqc/3237472.png"} alt="User" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-base-content">{user.name}</div>
                                                <div className="text-[10px] opacity-40 uppercase font-black">Member ID: {user._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-bold text-base-content">{user.email}</div>
                                        <div className="text-[10px] opacity-40 italic">verified account</div>
                                    </td>
                                    <td className="text-center">
                                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center w-max mx-auto gap-2">
                                            <FaUserGraduate className="text-xs" />
                                            {user.role || 'Student'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleMakeAdmin(user._id)} 
                                            className="btn btn-sm px-6 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 border-none shadow-lg shadow-indigo-500/20 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                        >
                                            <FaUserShield className="mr-2" /> Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Responsive Pagination Controls */}
            <div className="flex justify-center items-center gap-3 mt-12 mb-10 transition-all">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20"
                    disabled={page === 1}
                > &larr; </button>

                <div className="flex gap-2 bg-base-200 p-2 rounded-full border border-base-300 shadow-inner">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                                pageNumber === page 
                                ? 'bg-primary text-white shadow-xl scale-110' 
                                : 'bg-base-100 text-base-content/40 hover:bg-base-300'
                            }`}
                        > {pageNumber} </button>
                    ))}
                </div>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="btn btn-circle btn-ghost border border-base-300 bg-base-200 hover:bg-primary hover:text-white disabled:opacity-20"
                    disabled={page === totalPages}
                > &rarr; </button>
            </div>
        </motion.div>
    );
};

export default Users;