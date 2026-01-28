import { useLoaderData } from "react-router-dom";
import Heading from "../../../../components/Heading/Heading";
import { FaPlus, FaUserCheck, FaUsers, FaChartLine } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AprovedClassDetails = () => {
    const aprovedClass = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const currentTheme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        document.title = `Instructor | ${aprovedClass.title}`;
    }, [aprovedClass.title]);

    const { data: assignment = [], refetch } = useQuery({
        queryKey: ['assignment', aprovedClass._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`assignments?classId=${aprovedClass._id}`);
            return res.data;
        }
    });

    const handleAddAssignment = () => document.getElementById('my_modal_1').showModal();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const deadline = form.deadline.value;
        const description = form.description.value;
        const classId = aprovedClass._id;

        const assignmentInfo = { title, deadline, description, classId };

        axiosSecure.post('/assignments', assignmentInfo)
            .then(res => {
                if (res.data.insertedId) {
                    refetch();
                    document.getElementById('my_modal_1').close();
                    Swal.fire({
                        title: "Created!",
                        icon: "success",
                        background: currentTheme === 'dark' ? '#0f172a' : '#ffffff',
                        color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                    });
                    form.reset();
                }
            });
    }

    return (
        <div className="pb-24 px-4 lg:px-8 bg-base-100 min-h-screen">
            <Heading title="Class Progress" subtitle="Live tracking of your course engagement" />

            <div className="max-w-5xl mx-auto mt-8">
                {/* Compact Analytics Banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-white/10">
                    
                    {/* Compact Header */}
                    <div className="flex justify-between items-center mb-10 px-2">
                        <div className="flex items-center gap-3">
                            <FaChartLine className="text-white text-xl" />
                            <h2 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tighter">Live Analytics</h2>
                        </div>
                        <button 
                            onClick={handleAddAssignment} 
                            className="btn btn-sm lg:btn-md bg-white/20 hover:bg-white/30 border-none text-white rounded-xl px-5 font-black uppercase text-[10px] tracking-widest shadow-lg"
                        >
                            <FaPlus className="mr-2" /> Create
                        </button>
                    </div>

                    {/* Smaller, Balanced Stat Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <CompactStatBox icon={<FaUsers />} value={aprovedClass.enrolment} label="Enrollment" />
                        <CompactStatBox icon={<IoBookmarksSharp />} value={assignment?.length} label="Assignments" />
                        <CompactStatBox icon={<FaUserCheck />} value={aprovedClass?.assignmentSubmited || 0} label="Submissions" />
                    </div>
                </div>
            </div>

            {/* Assignment Modal */}
            <dialog id="my_modal_1" className="modal backdrop-blur-sm">
                <div className="modal-box bg-base-100 rounded-[2.5rem] border border-base-300 p-8 max-w-md shadow-2xl">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-center mb-6 text-base-content">New Assignment</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control">
                            <label className="label-text font-black uppercase text-[10px] opacity-40 mb-1">Title</label>
                            <input name='title' className="input input-bordered rounded-xl bg-base-200 border-none font-bold" required />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-black uppercase text-[10px] opacity-40 mb-1">Deadline</label>
                            <input type="date" name='deadline' className="input input-bordered rounded-xl bg-base-200 border-none font-bold" required />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-black uppercase text-[10px] opacity-40 mb-1">Description</label>
                            <textarea name='description' className="textarea rounded-xl bg-base-200 border-none font-medium h-24" required></textarea>
                        </div>
                        <button className="btn btn-primary w-full rounded-xl font-black uppercase tracking-widest shadow-lg">Submit Task</button>
                    </form>
                    <div className="modal-action absolute top-0 right-5">
                        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost">✕</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

// Compact Internal Component
const CompactStatBox = ({ icon, value, label }) => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-[2rem] flex items-center justify-between group transition-all hover:bg-white/20">
        <div className="text-left">
            <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{label}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-inner">
            {icon}
        </div>
    </div>
);

export default AprovedClassDetails;