import { motion } from "framer-motion";

const Heading = ({ title, subtitle }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 px-2 lg:px-0 relative overflow-hidden"
        >
            <div className="flex flex-col space-y-2 relative z-10">
                
                {/* Colorful Accent Line & Tag */}
                <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-black text-[10px] uppercase tracking-[0.4em]">
                        Administrative Console
                    </span>
                </div>

                {/* Gradient Title Section */}
                <h1 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight uppercase">
                    <span className="text-base-content mr-3">{title.split(' ')[0]}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500">
                        {title.split(' ').slice(1).join(' ')}
                    </span>
                </h1>

                {/* Subtitle with better visibility */}
                {subtitle && (
                    <p className="text-sm lg:text-base opacity-70 font-medium max-w-2xl leading-relaxed text-base-content/80">
                        {subtitle}
                    </p>
                )}

                {/* Decorative Colorful Line */}
                <div className="pt-4">
                    <div className="h-[2px] w-full bg-base-300/50 relative rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "120px" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        ></motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle background glow for the heading area */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </motion.div>
    );
};

export default Heading;