import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; // Motion import

const Teaching = () => {
    useEffect(() => {
        document.title = 'Teach on LearnQuest | Become an Instructor';
    }, []);

    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // Get user data to check role
    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data;
        }
    });

    // Check if already applied
    const { data: applyforTeaching = [], refetch } = useQuery({
        queryKey: ['applyforTeaching', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applyforTeaching?email=${user.email}`)
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        const info = {
            name: data.name,
            image: data.image || user.photoURL,
            email: user?.email,
            title: data.title,
            experience: data.experience,
            category: data.category,
            userId: users[0]?._id,
            status: "pending"
        };

        // Validations
        if (applyforTeaching.length > 0) {
            Swal.fire({ title: "Already applied!", text: "Your application is currently being reviewed.", icon: "error" });
            reset(); return;
        }
        if (users[0]?.role === "admin") {
            Swal.fire({ title: "Admin Access", text: "Admins cannot apply for instructor roles.", icon: "error" });
            reset(); return;
        }
        if (users[0]?.role === "teacher") {
            Swal.fire({ title: "Already an Instructor", text: "You are already a registered teacher.", icon: "warning" });
            reset(); return;
        }

        // Final Submit
        axiosPublic.post('/applyforTeaching', info)
            .then(res => {
                if (res.data.insertedId) {
                    refetch();
                    Swal.fire({ title: "Application Submitted!", text: "We will review your profile soon.", icon: "success" });
                    reset();
                }
            });
    }

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-20 px-4 lg:px-0">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto overflow-hidden bg-white rounded-[2.5rem] border border-base-200 shadow-2xl flex flex-col lg:flex-row"
            >
                {/* Left Side: Visual Experience */}
                <div className="lg:w-[55%] relative group overflow-hidden">
                    <img 
                        className="h-full w-full object-cover min-h-[300px] lg:min-h-full brightness-[0.85] transition-transform duration-1000 group-hover:scale-105" 
                        src="https://i.ibb.co/NtMMV8D/photo-1515378791036-0648a3ef77b2-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" 
                        alt="Teaching" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent flex items-center p-12">
                        <div className="max-w-md text-white space-y-4 hidden lg:block">
                            <h2 className="text-5xl font-black leading-tight tracking-tighter uppercase">
                                Share Your <br /> Knowledge
                            </h2>
                            <p className="text-lg font-medium opacity-90 italic">
                                "Teaching is the greatest act of optimism." Join our global community of expert mentors.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className="lg:w-[45%] p-8 lg:p-14 bg-gradient-to-br from-white to-slate-50">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                            Become an Instructor
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Apply Now</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name & Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" {...register("name")} placeholder="John Doe" className="input input-bordered w-full rounded-2xl bg-white focus:ring-2 ring-primary/20 transition-all font-bold" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Profile URL</label>
                                <input type="text" {...register("image")} placeholder="Image URL (Optional)" className="input input-bordered w-full rounded-2xl bg-white text-xs font-bold" />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Professional Title</label>
                            <input type="text" {...register("title")} placeholder="e.g. Senior Software Engineer" className="input input-bordered w-full rounded-2xl bg-white font-bold" required />
                        </div>

                        {/* Experience & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Experience</label>
                                <select {...register("experience")} className="select select-bordered w-full rounded-2xl font-bold bg-white" required>
                                    <option value="" disabled selected>Select level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="mid-level">Mid-level</option>
                                    <option value="experienced">Experienced</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject Category</label>
                                <select {...register("category")} className="select select-bordered w-full rounded-2xl font-bold bg-white" required>
                                    <option value="" disabled selected>Select category</option>
                                    <option>Web Development</option>
                                    <option>Digital Marketing</option>
                                    <option>Cyber Security</option>
                                    <option>Machine Learning</option>
                                    <option>Data Analysis</option>
                                </select>
                            </div>
                        </div>

                        {/* Email (Disabled) */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Registered Email</label>
                            <input type="text" defaultValue={user?.email} className="input input-bordered w-full rounded-2xl bg-slate-100 font-bold opacity-70" disabled />
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest text-sm"
                        >
                            Submit Application
                        </motion.button>
                        
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tighter">
                            By applying, you agree to our Instructor Terms and Conditions.
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Teaching;