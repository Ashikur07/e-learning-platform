import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineCalendar } from "react-icons/hi";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
    const { image, title, description, enrol_date, price } = course;

    // Card Item Animation
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            variants={itemVariants}
            whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
            }}
            className="group bg-base-100 rounded-[2.5rem] p-4 border border-base-200 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col h-full"
        >
            
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-[2rem] h-52">
                <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover" 
                    src={image} 
                    alt={title} 
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                    <HiOutlineCalendar className="text-[#e96223] text-xs" />
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">{enrol_date}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-3 pt-6 pb-2 flex flex-col flex-grow">
                <h1 className="text-xl font-extrabold text-base-content leading-tight mb-3 group-hover:text-primary transition-colors">
                    {title}
                </h1>

                <p className="text-sm text-base-content/60 font-medium line-clamp-2 mb-6 flex-grow">
                    {description}
                </p>

                {/* Footer Section */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#e96223] uppercase tracking-widest opacity-70">Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-base-content">${price}</span>
                            <span className="text-xs opacity-30 line-through">$500</span>
                        </div>
                    </div>

                    <Link to='/allclasses'>
                        <motion.button 
                            whileHover={{ rotate: -45, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-12 w-12 rounded-2xl bg-base-content text-base-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                        >
                            <HiArrowRight className="text-xl" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;