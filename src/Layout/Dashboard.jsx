import { NavLink, Outlet } from "react-router-dom";
import { FaEnvelope, FaList, FaUtensils } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { IoBookmarksSharp } from "react-icons/io5";

const Dashboard = () => {
    const student = false;
    const admin = true;
    const { user } = useAuth();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400 px-5">

                {/* show user information */}
                <div className="text-center mt-10">
                    <div className="avatar mb-6">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                    <p className="text-lg">{user.email}</p>
                </div>
                <div className="divider"></div>

                {/* show routes corresponding to user,admin,teacher */}
                <ul className="menu text-[17px]">

                    {/* for student */}
                    {
                        student &&
                        <>
                            <li>
                                <NavLink to='/dashboard/studentHome'>
                                    <FaHome />
                                    Student Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myEnrollClass'>
                                    <IoBookmarksSharp />
                                    Myenroll class</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile'>
                                    <FaList />
                                    Profile</NavLink>
                            </li>
                        </>
                    }

                    {/* for admin */}
                    {
                        admin &&
                        <>
                            <li>
                                <NavLink to='/dashboard/adminHome'>
                                    <FaHome />
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/teacherRequest'>
                                    <IoBookmarksSharp />
                                    Teacher Request</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile'>
                                    <FaList />
                                    Profile</NavLink>
                            </li>
                        </>
                    }



                    {/* share nav links*/}
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/Contact'>
                            <FaEnvelope />
                            Contact</NavLink>
                    </li>

                </ul>
            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;