import { Link, useLoaderData } from "react-router-dom";

const ClassDetails = () => {

    const classes = useLoaderData();
    console.log(classes);

    return (
        <div className="mt-5 pb-24">
            <div className="shadow-2xl max-w-6xl mx-auto flex">

                <div className="flex-1">
                    <img className="h-full" src={classes?.image} alt="" />
                </div>

                <div className="bg-blue-200 flex-1 p-10">
                    <h1 className="text-3xl font-bold pb-2">{classes.title}</h1>
                    <p className="pb-5">{classes.description}</p>
                    <p>Price : ${classes.price}</p>
                    <p >Totla Enrolment: {classes.enrolment}</p>
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