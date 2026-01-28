import { Link } from "react-router-dom";
import { FaUserCheck, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const ClassCard = ({ clas, index }) => {
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -10 }}
            className="group bg-base-100 rounded-[2.5rem] p-4 border border-base-200 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden rounded-[2rem]">
                <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={clas?.image} 
                    alt={clas?.title} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <p className="text-primary font-black text-sm">${clas?.price}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow flex flex-col p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
                        <FaUserCheck className="text-sm" />
                    </div>
                    <p className="text-xs font-bold text-base-content/60 uppercase tracking-widest">
                        {clas?.enrolment} Enrolled
                    </p>
                </div>

                <h1 className="text-xl font-extrabold text-base-content leading-tight mb-3 group-hover:text-primary transition-colors">
                    {clas?.title}
                </h1>
                <p className="text-sm text-base-content/60 font-medium line-clamp-2 mb-6">
                    {clas?.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl mb-6">
                    <img 
                        className="rounded-full w-12 h-12 object-cover border-2 border-white shadow-sm" 
                        src={clas?.photoURL || "https://i.ibb.co/FbjVmqc/3237472.png"} 
                        alt={clas?.name} 
                    />
                    <div className="overflow-hidden">
                        <p className="font-bold text-sm text-base-content truncate">{clas?.name}</p>
                        <p className="text-[10px] font-bold opacity-50 truncate uppercase tracking-tighter">{clas?.email}</p>
                    </div>
                </div>

                {/* CTA Button */}
                <Link to={`/classDetails/${clas._id}`} className="mt-auto">
                    <button className="w-full py-4 bg-base-content text-base-100 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-lg group/btn">
                        Enroll Now
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default ClassCard;