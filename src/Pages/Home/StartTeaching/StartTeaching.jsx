import { Link } from "react-router-dom";

const StartTeaching = () => {
    return (
        <div className="my-28">
            <h1 className="text-5xl text-slate-700 text-center font-semibold pb-10">Start Teaching Now</h1>
            <div className="flex max-w-6xl mx-auto">
                <div className="flex-1">
                    <img className="w-[90%] h-96" src="https://i.ibb.co/MRrqVqW/Improving-teaching-styles.png" alt="" />
                </div>

                <div className="flex-1 mt-12">
                    <h1 className="text-3xl font-semibold pb-3">Teach on Your Schedule</h1>
                    <p className="pb-8">Enjoy the flexibility to teach when it suits you. Whether you prefer part-time or full-time teaching, our platform accommodates your availability. Create your own schedule, choose the hours you want to work, and balance teaching with other commitments. With our user-friendly tools, managing your classes has never been easier.</p>
                    <Link to='/teaching' className="bg-[#0B7077] p-2 text-white px-4  ">Start teaching today</Link>
                </div>
            </div>
        </div>
    );
};

export default StartTeaching;