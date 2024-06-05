import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const MyCourseCard = ({ clas, handleDelete }) => {
    const { user } = useAuth();

    return (
        <div >
            <div className="shadow-2xl rounded-xl h-full flex flex-col">
                <img className="w-full h-52 rounded-t-xl" src={clas.image} alt="" />

                <div className="p-6 border-2 flex-grow flex flex-col justify-between">

                    <div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-[#d66e3e] font-extrabold">Price: ${clas.price}</p>
                            <p className="py-1 px-2 rounded-xl bg-yellow-700 font-semibold text-white">{clas.status}</p>
                        </div>

                        <div>
                            <h1 className="text-lg py-2 font-bold">{clas.title}</h1>
                            <p className="">{clas.description}</p>
                        </div>
                    </div>


                    <div className="space-y-8 mt-5">
                        <div className="flex gap-4 font-semibold">
                            <img className="rounded-full w-14" src={user?.photoURL} alt="" />
                            <div>
                                <p className="">{clas.name}</p>
                                <p className="">{clas.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => handleDelete(clas._id)} className="bg-orange-600 py-1 px-3 text-white rounded-md">Delete</button>
                            <Link to={`/dashboard/update/${clas._id}`} className="bg-green-600 py-1 px-3 text-white rounded-md">Update</Link>

                            {
                                clas?.status === 'accepted' ?
                                    <Link to={`/dashboard/details/${clas._id}`}><button className="bg-cyan-800 py-1 px-3 text-white rounded-md">Details</button></Link> :
                                    <button className="bg-slate-200 py-1 px-3 text-white rounded-md" disabled>Details</button>

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;