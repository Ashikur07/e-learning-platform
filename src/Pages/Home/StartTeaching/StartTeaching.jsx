import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi"; // Icon use korle CTA (Call to Action) bhalo lage

const StartTeaching = () => {
    return (
        <section className="my-28 px-4 lg:px-0">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-black text-base-content tracking-tight">
                        Become an <span className="text-primary italic">Instructor</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Side: Image with subtle frame */}
                    <div className="flex-1 w-full group">
                        <div className="relative">
                            {/* Decorative background shape */}
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                            
                            <img 
                                className="relative z-10 w-full h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                                src="https://i.ibb.co/MRrqVqW/Improving-teaching-styles.png" 
                                alt="Teaching Style" 
                            />
                            
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <h3 className="text-2xl lg:text-4xl font-extrabold text-base-content leading-tight">
                            Teach on Your Own <br className="hidden lg:block" />
                            <span className="text-primary">Schedule & Terms</span>
                        </h3>
                        
                        <p className="text-base-content/70 text-lg leading-relaxed font-medium">
                            Enjoy the flexibility to teach when it suits you. Whether you prefer part-time or full-time teaching, our platform accommodates your availability. Create your own schedule, choose the hours you want to work, and balance teaching with other commitments.
                        </p>

                        <div className="pt-4">
                            <Link 
                                to='/teaching' 
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group"
                            >
                                Start Teaching Today
                                <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        
                        {/* Simple feature list */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 opacity-60 text-sm font-bold uppercase tracking-widest">
                            <span>✓ Flexible Hours</span>
                            <span>✓ Global Reach</span>
                            <span>✓ Easy Tools</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartTeaching;