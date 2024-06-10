import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Heading from "../Heading/Heading";

const Profile = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Profile';
    }, []);


    return (
        <div>      
            {
                <Heading title="PROFILE"></Heading>
            }

            {/* details */}
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-16 justify-center items-center bg-slate-600 mt-10 lg:mt-32 p-10 lg:max-w-2xl lg:mx-auto">

                <div className="avatar">
                    <div className="w-40 hover:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-10 lg:mr-0">
                        <img src={user?.photoURL} />
                    </div>
                </div>

                <div className="text-white">
                    <h1 className="text-5xl font-semibold">{user?.displayName}</h1>
                    <p className="text-2xl">{user?.email}</p>
                    <p>{user?.phoneNumber}</p>
                    <h1 className="text-2xl font-semibold">Role: Admin</h1>
                </div>

            </div>

        </div>
    );
};

export default Profile;