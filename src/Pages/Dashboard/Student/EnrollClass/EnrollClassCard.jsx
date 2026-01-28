import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";

const EnrollClassCard = ({ clas }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <div className="bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl group">
                
                {/* Image Container with Overlay */}
                <div className="relative h-56 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={clas?.image} alt={clas?.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FaPlayCircle className="text-white text-5xl drop-shadow-lg" />
                    </div>
                    {/* Price/Category Tag */}
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-4 py-1 rounded-xl shadow-lg border border-white/10">
                        <p className="text-white font-black text-xs uppercase tracking-widest">Enrolled</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                        <h1 className="text-xl font-black text-base-content leading-tight tracking-tight uppercase group-hover:text-primary transition-colors">
                            {clas?.title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-indigo-500">BY</span>
                            </div>
                            <p className="text-sm font-bold opacity-60 italic">{clas.name}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to={`/dashboard/enrollClassDetails/${clas._id}`}> 
                            <button className="btn btn-primary w-full rounded-2xl font-black uppercase tracking-tighter shadow-lg shadow-primary/20 group-active:scale-95 transition-all">
                                Continue Lesson
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EnrollClassCard;