import Swal from "sweetalert2";
import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTag, FaInfoCircle } from "react-icons/fa";

const AddClass = () => {
    useEffect(() => {
        document.title = 'Dashboard | Add Class';
    }, []);

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // SweetAlert Theme Sync
    const currentTheme = localStorage.getItem("theme") || "light";

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const price = parseFloat(form.price.value);
        const name = user?.displayName;
        const email = user?.email;
        const description = form.description.value;
        const status = "pending";
        const enrolment = 0;
        const photoURL = user?.photoURL;
        const assignmentSubmited = 0;

        const classInfo = {
            title, image, price, name, email, description, status, enrolment, photoURL, assignmentSubmited
        };

        axiosPublic.post('/classes', classInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "New class added to pending list.",
                        icon: "success",
                        background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                        color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                        confirmButtonColor: '#6366f1'
                    });
                    navigate('/dashboard/myClass');
                }
            });
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-24 bg-base-100 min-h-screen transition-colors duration-300"
        >
            <div className="pt-8">
                <Heading 
                    title="Create Course" 
                    subtitle="Share your expertise with the world by adding a new educational course." 
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-10">
                <div className="bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl overflow-hidden relative group transition-all duration-500 hover:shadow-primary/5">
                    
                    {/* Decorative Accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-500 to-indigo-600"></div>

                    <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black text-base-content tracking-tighter uppercase">Class Information</h2>
                            <p className="text-xs opacity-50 font-bold uppercase tracking-[0.2em]">Course Details & Instructor Identity</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Class Title */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Course Title</span>
                                </label>
                                <div className="relative">
                                    <input type="text" name="title" placeholder="e.g. Master Web Development" className="input input-bordered w-full rounded-2xl bg-base-200 focus:border-primary transition-all font-medium" required />
                                    <FaInfoCircle className="absolute right-4 top-4 opacity-20" />
                                </div>
                            </div>

                            {/* Price */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Course Price ($)</span>
                                </label>
                                <div className="relative">
                                    <input type="number" name="price" placeholder="99.99" className="input input-bordered w-full rounded-2xl bg-base-200 focus:border-primary transition-all font-medium" required />
                                    <FaTag className="absolute right-4 top-4 opacity-20" />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Cover Image URL</span>
                            </label>
                            <div className="relative">
                                <input type="text" name="image" placeholder="https://images.unsplash.com/photo-..." className="input input-bordered w-full rounded-2xl bg-base-200 focus:border-primary transition-all font-medium" required />
                                <FaCloudUploadAlt className="absolute right-4 top-4 opacity-20" />
                            </div>
                        </div>

                        {/* Read-only Instructor Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-base-200 rounded-[2rem] border border-base-300 border-dashed">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-40 italic">Instructor Name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} className="input bg-transparent border-none text-sm font-black opacity-60 px-0" disabled />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-40 italic">Contact Email</span>
                                </label>
                                <input type="text" defaultValue={user?.email} className="input bg-transparent border-none text-sm font-black opacity-60 px-0" disabled />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Course Description</span>
                            </label>
                            <textarea name='description' placeholder="Tell your students what they will learn in this class..." className="textarea textarea-bordered textarea-md w-full rounded-[2rem] bg-base-200 focus:border-primary transition-all font-medium min-h-[150px]" required></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button className="btn btn-primary w-full rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white">
                                <FaCloudUploadAlt className="text-xl mr-2" /> Add Class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default AddClass;