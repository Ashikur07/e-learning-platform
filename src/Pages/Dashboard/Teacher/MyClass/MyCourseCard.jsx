import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";

const MyCourseCard = ({ clas, handleDelete }) => {
    const { user } = useAuth();

    return (
        <div className="h-full group">
            <div className="bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-xl h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-primary/30">
                
                {/* Thumbnail & Status Overlay */}
                <div className="relative h-52 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={clas.image} alt={clas.title} />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-lg backdrop-blur-md ${
                            clas.status === 'accepted' ? 'bg-emerald-500/80 text-white border-emerald-400' :
                            clas.status === 'rejected' ? 'bg-rose-500/80 text-white border-rose-400' :
                            'bg-amber-500/80 text-white border-amber-400'
                        }`}>
                            {clas.status}
                        </span>
                        <span className="bg-base-100/90 text-primary px-3 py-1 rounded-xl text-xs font-black shadow-md border border-base-300">
                            ${clas.price}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-7 flex-grow flex flex-col justify-between">
                    <div>
                        <h1 className="text-xl font-black text-base-content leading-tight tracking-tighter uppercase group-hover:text-primary transition-colors line-clamp-2 mb-3">
                            {clas.title}
                        </h1>
                        <p className="text-xs opacity-50 font-medium line-clamp-3 leading-relaxed mb-6">
                            {clas.description}
                        </p>
                        
                        {/* Instructor Info */}
                        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-2xl mb-8">
                            <img className="rounded-xl w-10 h-10 object-cover border border-base-300 shadow-sm" src={user?.photoURL} alt="Instructor" />
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black uppercase text-primary truncate tracking-wider">{clas.name}</p>
                                <p className="text-[9px] opacity-40 truncate">{clas.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-base-300/50">
                        <button 
                            onClick={() => handleDelete(clas._id)} 
                            className="btn btn-sm h-10 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border-none transition-all flex items-center justify-center gap-1 text-[10px] font-black uppercase"
                        >
                            <FaTrashAlt /> Del
                        </button>
                        
                        <Link 
                            to={`/dashboard/update/${clas._id}`} 
                            className="btn btn-sm h-10 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white border-none transition-all flex items-center justify-center gap-1 text-[10px] font-black uppercase"
                        >
                            <FaEdit /> Edit
                        </Link>

                        {clas?.status === 'accepted' ? (
                            <Link to={`/dashboard/details/${clas._id}`} className="w-full">
                                <button className="btn btn-sm h-10 w-full rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white border-none transition-all flex items-center justify-center gap-1 text-[10px] font-black uppercase">
                                    <FaInfoCircle /> Info
                                </button>
                            </Link>
                        ) : (
                            <button className="btn btn-sm h-10 rounded-xl bg-base-300 text-base-content/20 border-none cursor-not-allowed text-[10px] font-black uppercase" disabled>
                                Info
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;