
const BannerContent = () => {
    return (
        <div className="lg:bg-gradient-to-r from-[#221414]  border-black h-full relative">
            <div className="absolute top-1/4 left-12 lg:left-1/4 text-[#d9f13b]">
                <p className="text-xl lg:text-2xl font-bold text-white">E-LEARNING</p>
                <h1 className="uppercase text-2xl font-extrabold"><span className="text-4xl lg:text-7xl pr-2">learn </span> at <span className="text-4xl lg:text-7xl pl-4"> home</span></h1>
                <p className="text-white text-xl pt-3 max-w-4xl hidden lg:block">Self-study through e-learning and homeschooling with virtual classrooms, online courses, webinars, educational apps, and video tutorials, supported by digital textbooks, interactive learning, and remote education, enhances skill development and knowledge sharing.</p>
            </div>
        </div>
    );
};

export default BannerContent;