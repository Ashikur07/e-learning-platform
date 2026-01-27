const TeacherTraining = () => {
    const trainingFeatures = [
        {
            icon: "https://i.ibb.co/MpkqHFw/image.png",
            text: "Teachers don’t get lost in the grid view and have a dedicated Podium space."
        },
        {
            icon: "https://i.ibb.co/CWpBzB3/image.png",
            text: "TA’s and presenters can be moved to the front of the class."
        },
        {
            icon: "https://i.ibb.co/XyjBVxD/image.png",
            text: "Teachers can easily see all students and class data at one time."
        }
    ];

    return (
        <section className="py-20 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    
                    {/* Left Side: Visual/Image */}
                    <div className="flex-1 w-full group">
                        <div className="relative">
                            {/* Decorative background circle */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                            
                            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-base-200">
                                <img 
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                                    src="https://i.ibb.co/qdbwQgV/image.png" 
                                    alt="Teacher Training Illustration" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Features Content */}
                    <div className="flex-1 space-y-8">
                        {/* Heading */}
                        <div className="space-y-3">
                            <p className="text-orange-500 font-black uppercase tracking-widest text-sm italic">Training Program</p>
                            <h2 className="text-4xl lg:text-6xl font-black text-base-content leading-tight">
                                Advanced <br />
                                <span className="text-orange-500">Teacher Training</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
                        </div>

                        {/* Interactive Feature List */}
                        <div className="space-y-6">
                            {trainingFeatures.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-start gap-5 p-5 bg-base-200/40 rounded-3xl border border-base-300/50 hover:bg-base-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
                                >
                                    {/* Icon Container */}
                                    <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-md flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                                        <img src={feature.icon} alt="Icon" className="w-full h-full object-contain" />
                                    </div>

                                    {/* Text Content */}
                                    <p className="text-base-content/80 text-sm lg:text-base font-semibold leading-relaxed pt-1">
                                        {feature.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeacherTraining;