import { FaUserCheck, FaUsers } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";

const AdditionalInformation = () => {
    return (
        <div className="flex ">

            <div className="flex-1 bg-slate-500">
                <div className="flex justify-center pt-40 gap-6">
                    <div className="p-7 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <FaUsers className="text-4xl text-blue-700"></FaUsers>
                        <p className="text-4xl font-bold">100</p>
                        <h1 className="text-3xl">Total User</h1>
                    </div>
                    <div className="p-5 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <IoBookmarksSharp className="text-4xl text-blue-700" />
                        <p className="text-4xl font-bold">100</p>
                        <h1 className="text-3xl">total classes</h1>
                    </div>
                    <div className="p-6 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <FaUserCheck className="text-4xl text-blue-700"></FaUserCheck>
                        <p className="text-4xl font-bold">100</p>
                        <h1 className="text-3xl">Enrollment</h1>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <img src="https://i.ibb.co/r3dnvDX/photo-1523240795612-9a054b0db644-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
            </div>
        </div>
    );
};

export default AdditionalInformation;