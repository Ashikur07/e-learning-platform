import { FaUserCheck, FaUsers } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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

    return (
        <section className="mt-24 mb-16 px-4 lg:px-0">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[2.5rem] bg-base-200/50 border border-base-300">
                
                {/* Left Side: Stats Content */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="mb-10 text-left">
                        <h2 className="text-3xl lg:text-5xl font-black text-base-content leading-tight">
                            Our Impact in <br /> 
                            <span className="text-primary italic">Numbers</span>
                        </h2>
                        <p className="mt-4 text-base-content/60 font-medium">Empowering learners and educators across the globe through quality content.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
                        {stats.map((item) => (
                            <div key={item.id} className="group flex items-center gap-5 p-6 bg-base-100 rounded-3xl border border-base-300/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Image Section */}
                <div className="flex-1 relative min-h-[350px]">
                    <img 
                        src="https://i.ibb.co/r3dnvDX/photo-1523240795612-9a054b0db644-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" 
                        alt="Students Learning" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Subtle Overlay to match theme */}
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                </div>
            </div>
        </section>
    );
};

export default AdditionalInformation;