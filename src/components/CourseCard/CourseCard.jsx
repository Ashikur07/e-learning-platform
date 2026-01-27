import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineCalendar } from "react-icons/hi"; // icons use korle premium lage

const CourseCard = ({ course }) => {
    const { image, title, description, enrol_date, price } = course;

    return (
        <div className="group bg-base-100 rounded-[2.5rem] p-4 border border-base-200 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col h-full">
            
            {/* Image Section with a modern mask/shape */}
            <div className="relative overflow-hidden rounded-[2rem] h-52">
                <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
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
                {/* Minimal Title */}
                <h1 className="text-xl font-extrabold text-base-content leading-tight mb-3 group-hover:text-primary transition-colors">
                    {title}
                </h1>

                {/* Light Description */}
                <p className="text-sm text-base-content/60 font-medium line-clamp-2 mb-6 flex-grow">
                    {description}
                </p>

                {/* Footer Section: Clean & Spacious */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#e96223] uppercase tracking-widest opacity-70">Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-base-content">${price}</span>
                            <span className="text-xs opacity-30 line-through">$500</span>
                        </div>
                    </div>

                    <Link to='/allclasses'>
                        <button className="h-12 w-12 rounded-2xl bg-base-content text-base-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-gray-200 dark:shadow-none group-hover:rotate-[-45deg]">
                            <HiArrowRight className="text-xl" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;