import useAuth from "../../hooks/useAuth";
import { FaUserCheck } from "react-icons/fa";

const ClassCard = ({ clas }) => {

    const { user } = useAuth();

    return (
        <div >
            <div className="shadow-2xl h-full flex flex-col">
                <img className="w-full h-56 " src={clas.image} alt="" />

                <div className="border-2 flex-grow flex flex-col justify-between">

                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-[#d66e3e] font-extrabold">Price: ${clas.price}</p>
                            <div className="flex items-center gap-1">
                                <FaUserCheck className="text-lg"></FaUserCheck>
                                <p className="font-semibold text-lg">Enrolment : <span className="text-[#d66e3e] font-bold">{clas?.enrolment}</span></p>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-lg py-2 font-bold">{clas.title}</h1>
                            <p className="">{clas.description}</p>
                        </div>
                    </div>

                    <div className="space-y-8 mt-5">
                        <div className="flex gap-4 font-semibold pl-6">
                            <img className="rounded-full w-14" src={user?.photoURL} alt="" />
                            <div>
                                <p className="">{clas.name}</p>
                                <p className="">{clas.email}</p>
                            </div>
                        </div>

                        <div>
                            <button className="bg-cyan-800 w-full py-2 text-white ">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;