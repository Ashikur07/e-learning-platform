import { Link, useLoaderData } from "react-router-dom";

const ClassDetails = () => {

    const classes = useLoaderData();
    console.log(classes);

    return (
        <div className="lg:mt-10 pb-24">
            <div className="shadow-2xl max-w-6xl mx-auto flex flex-col lg:flex-row">

                <div className="lg:flex-1">
                    <img className="w-full h-full" src={classes?.image} alt="" />
                </div>

                <div className="bg-blue-200 lg:flex-1 p-10 text-lg">
                    <h1 className="text-4xl font-bold pb-2">{classes.title}</h1>
                    <p className="pb-5 text-lg"><span className="font-bold">Description:</span> {classes.description}</p>
                    <p><span className="font-bold">Price:</span> ${classes.price}</p>
                    <p ><span className="font-bold">Totla Enrolment:</span> {classes.enrolment}</p>
                    <div className="pt-10 flex gap-4 font-semibold">
                        {
                            classes?.photoURL ?
                                <img className="rounded-full w-14 h-14" src={classes?.photoURL} alt="" /> :
                                <img className="rounded-full w-14 h-14" src="https://i.ibb.co/FbjVmqc/3237472.png" alt="" />
                        }
                        <div>
                            <p className="">{classes?.name}</p>
                            <p className="">{classes?.email}</p>
                        </div>
                    </div>
                    <p className="pt-5 pb-2">Make a Payment to Continue This Course</p>
                    <Link to={`/payment/${classes._id}`}>
                        <button className="btn btn-primary">Payment Now</button>
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default ClassDetails;