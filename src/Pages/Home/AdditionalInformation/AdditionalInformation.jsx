import { FaUserCheck, FaUsers } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const AdditionalInformation = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch Users
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            return res.data;
        }
    });

    // Fetch Classes
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/classes');
            return res.data;
        }
    });

    const totalEnrolment = classes.reduce((total, currentClass) => {
        const enrolment = parseInt(currentClass.enrolment, 10);
        return total + (isNaN(enrolment) ? 0 : enrolment);
    }, 0);

    const stats = [
        { id: 1, label: "Total Users", value: users.length, icon: <FaUsers />, color: "text-blue-500", bg: "bg-blue-50" },
        { id: 2, label: "Total Classes", value: classes.length, icon: <IoBookmarksSharp />, color: "text-orange-500", bg: "bg-orange-50" },
        { id: 3, label: "Enrollments", value: totalEnrolment, icon: <FaUserCheck />, color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="mt-24 mb-16 px-4 lg:px-0 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[2.5rem] bg-base-200/50 border border-base-300"
            >
                
                {/* Left Side: Stats Content */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                        className="mb-10 text-left"
                    >
                        <h2 className="text-3xl lg:text-5xl font-black text-base-content leading-tight">
                            Our Impact in <br /> 
                            <span className="text-primary italic">Numbers</span>
                        </h2>
                        <p className="mt-4 text-base-content/60 font-medium italic">Empowering learners and educators across the globe through quality content.</p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6"
                    >
                        {stats.map((item) => (
                            <motion.div 
                                key={item.id} 
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, x: 10 }}
                                className="group flex items-center gap-5 p-6 bg-base-100 rounded-3xl border border-base-300/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className={`h-14 w-14 lg:h-16 lg:w-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl lg:text-3xl transition-transform group-hover:scale-110`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-2xl lg:text-4xl font-black text-base-content tracking-tighter">
                                        {item.value.toLocaleString()}+
                                    </p>
                                    <h3 className="text-sm lg:text-base font-bold text-base-content/50 uppercase tracking-widest">
                                        {item.label}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side: Image Section with Parallax Effect */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 relative min-h-[450px] overflow-hidden"
                >
                    <img 
                        src="https://i.ibb.co/r3dnvDX/photo-1523240795612-9a054b0db644-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" 
                        alt="Students Learning" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AdditionalInformation;