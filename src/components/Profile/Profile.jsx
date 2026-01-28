import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Heading from "../Heading/Heading";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaIdBadge, FaUserShield } from "react-icons/fa";

const Profile = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Profile | LearnQuest';
    }, []);

    // Firebase/Google photo high resolution logic
    const highResPhoto = user?.photoURL ? user.photoURL.replace("s96-c", "s400-c") : "https://i.ibb.co/FbjVmqc/3237472.png";

    return (
        <div className="min-h-screen bg-base-100 text-base-content pb-20 transition-colors duration-300">
            {/* Colorful Dynamic Heading */}
            <Heading 
                title="Personal Profile" 
                subtitle="Manage your identity and account settings across the platform." 
            />

            <div className="max-w-4xl mx-auto px-4 mt-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-base-200 rounded-[3rem] border border-base-300 shadow-2xl transition-all"
                >
                    {/* Compact Banner Box: Centered Name Only */}
                    <div className="relative h-32 lg:h-36 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 flex items-center justify-center">
                        <h1 className="text-3xl lg:text-5xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-xl px-4 text-center">
                            {user?.displayName}
                        </h1>
                    </div>

                    {/* Content Section: Aligned Middle */}
                    <div className="relative pt-10 pb-16 px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-10">
                        
                        {/* Optimized Avatar: Anti-Blur styling */}
                        <div className="relative shrink-0 -mt-20 lg:-mt-24">
                            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-[3rem] overflow-hidden ring-[10px] ring-base-200 shadow-2xl bg-base-300">
                                <img 
                                    src={highResPhoto} 
                                    alt="User Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    style={{ 
                                        imageRendering: 'auto',
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)'
                                    }} 
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-emerald-500 p-3 rounded-2xl shadow-xl border-4 border-base-200 text-white z-10">
                                <FaUserShield className="text-lg" />
                            </div>
                        </div>

                        {/* Details Grid: Clean & Readable */}
                        <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem 
                                    icon={<FaEnvelope className="text-indigo-500" />} 
                                    label="Email Address" 
                                    value={user?.email} 
                                />
                                <InfoItem 
                                    icon={<FaPhoneAlt className="text-emerald-500" />} 
                                    label="Phone Number" 
                                    value={user?.phoneNumber || "Not Provided"} 
                                />
                                <InfoItem 
                                    icon={<FaIdBadge className="text-purple-500" />} 
                                    label="Member ID" 
                                    value={`#${user?.uid?.slice(-8).toUpperCase() || "N/A"}`} 
                                />
                                <InfoItem 
                                    icon={<FaUserShield className="text-rose-500" />} 
                                    label="Account Role" 
                                    value="Administrator" 
                                />
                            </div>

                            {/* Standard Action Buttons */}
                            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
                                <button className="btn btn-primary rounded-2xl px-10 font-black uppercase tracking-tighter text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                    Update Profile
                                </button>
                                <button className="btn btn-ghost bg-base-300 rounded-2xl px-8 font-black uppercase tracking-tighter text-xs hover:bg-base-300/80 transition-all">
                                    Account Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Helper Item: Adaptive for Dark/Light
const InfoItem = ({ icon, label, value }) => (
    <div className="bg-base-100 p-4 rounded-[2rem] border border-base-300 flex items-center gap-4 transition-all hover:bg-base-300/30 group shadow-sm">
        <div className="p-3 bg-base-200 rounded-2xl group-hover:rotate-12 transition-transform shadow-inner">
            {icon}
        </div>
        <div className="text-left overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1 italic leading-none">
                {label}
            </p>
            <p className="font-bold text-sm truncate opacity-90 leading-tight">
                {value}
            </p>
        </div>
    </div>
);

export default Profile;