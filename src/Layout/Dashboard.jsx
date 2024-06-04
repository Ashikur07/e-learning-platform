import { NavLink, Outlet } from "react-router-dom";
import { FaEnvelope, FaList, FaUsers, } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { IoBookmarksSharp, IoPersonAdd } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";


const Dashboard = () => {

    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() =>{
        axios(`http://localhost:5000/users?email=${user.email}`)
        .then(res =>{
            setUserInfo(res.data);
        })
    },[])

    console.log(userInfo[0]?.role);


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
                    <p className="text-lg">{user?.email}</p>
                </div>
                <div className="divider"></div>

                {/* show routes corresponding to user,admin,teacher */}
                <ul className="menu text-[17px]">

                    {/* for student */}
                    {
                        userInfo[0]?.role ==="student" &&
                        <>
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
                        userInfo[0]?.role ==="admin" &&
                        <>
                            <li>
                                <NavLink to='/dashboard/teacherRequest'>
                                    <IoPersonAdd />
                                    Teacher Request</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/users'>
                                    <FaUsers />
                                    Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allClasses'>
                                    <IoBookmarksSharp />
                                    All classes</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile'>
                                    <FaList />
                                    Profile</NavLink>
                            </li>
                        </>
                    }

                    {/* for  Teacher */}
                    {
                        userInfo[0]?.role ==="teacher" &&
                        <>
                            <li>
                                <NavLink to='/dashboard/addclass'>
                                    <MdBookmarkAdd className="text-xl"/>
                                    Add Class</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myClass'>
                                    <IoBookmarksSharp />
                                    My Class</NavLink>
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