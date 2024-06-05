import { Link } from "react-router-dom";

const EnrollClassCard = ({ clas }) => {
    return (
        <div >
            <div className="shadow-2xl h-full flex flex-col">
                <img className="w-full h-56 " src={clas?.image} alt="" />

                <div className="border-2 flex-grow flex flex-col justify-between">

                    <div className="p-6 mb-4">
                        <h1 className="text-lg py-2 font-bold">{clas?.title}</h1>
                        <p className="text-lg">Posted By : {clas.name}</p>
                    </div>

                    <div className="space-y-8 mt-5">
                       
                        <div>
                            <Link> <button className="bg-cyan-800 w-full py-2 text-white ">Continue</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollClassCard;