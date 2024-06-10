import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaList, FaUsers, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { IoBookmarksSharp, IoPersonAdd } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`)
            .then(res => {
                setUserInfo(res.data);
            });
    }, [user.email]);

    const getDefaultPath = (role) => {
        switch (role) {
            case 'admin':
                return "/dashboard/teacherRequest";
            case 'teacher':
                return "/dashboard/myClass";
            case 'student':
                return "/dashboard/myEnrollClass";
            default:
                return "/dashboard";
        }
    };

    const defaultPath = getDefaultPath(userInfo[0]?.role);

    const handleLinkClick = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-full relative">
            <div className={`fixed z-30 md:relative md:z-auto min-w-64 min-h-screen bg-orange-400 px-5 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="relative mt-10">
                    <div className="absolute top-4 left-4 md:hidden">
                        <FaTimes className="text-white text-2xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
                    </div>
                </div>
                <div className="text-center mt-10">
                    <div className="avatar mb-6">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                            <img src={user?.photoURL} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="items-center">
                        <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                        <p className="text-lg">{user?.email}</p>
                    </div>
                </div>
                <div className="divider"></div>

                <ul className="menu text-[17px]">
                    {userInfo[0]?.role === "student" && (
                        <>
                            <li>
                                <NavLink to='/dashboard/myEnrollClass' isActive={() => ['/dashboard/myEnrollClass', '/dashboard/profile'].includes(location.pathname)} onClick={handleLinkClick}>
                                    <IoBookmarksSharp />
                                    My Enroll Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile' isActive={() => location.pathname === '/dashboard/profile'} onClick={handleLinkClick}>
                                    <FaList />
                                    Profile
                                </NavLink>
                            </li>
                        </>
                    )}

                    {userInfo[0]?.role === "admin" && (
                        <>
                            <li>
                                <NavLink to='/dashboard/teacherRequest' isActive={() => ['/dashboard/teacherRequest', '/dashboard/users', '/dashboard/allClasses', '/dashboard/profile'].includes(location.pathname)} onClick={handleLinkClick}>
                                    <IoPersonAdd />
                                    Teacher Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/users' isActive={() => location.pathname === '/dashboard/users'} onClick={handleLinkClick}>
                                    <FaUsers />
                                    Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allClasses' isActive={() => location.pathname === '/dashboard/allClasses'} onClick={handleLinkClick}>
                                    <IoBookmarksSharp />
                                    All Classes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile' isActive={() => location.pathname === '/dashboard/profile'} onClick={handleLinkClick}>
                                    <FaList />
                                    Profile
                                </NavLink>
                            </li>
                        </>
                    )}

                    {userInfo[0]?.role === "teacher" && (
                        <>
                            <li>
                                <NavLink to='/dashboard/addclass' isActive={() => ['/dashboard/addclass', '/dashboard/myClass', '/dashboard/profile'].includes(location.pathname)} onClick={handleLinkClick}>
                                    <MdBookmarkAdd className="text-xl" />
                                    Add Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myClass' isActive={() => location.pathname === '/dashboard/myClass'} onClick={handleLinkClick}>
                                    <IoBookmarksSharp />
                                    My Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile' isActive={() => location.pathname === '/dashboard/profile'} onClick={handleLinkClick}>
                                    <FaList />
                                    Profile
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="divider"></div>
                    <li>
                        <NavLink to='/' isActive={() => location.pathname === '/'} onClick={handleLinkClick}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contract' isActive={() => location.pathname === '/contract'} onClick={handleLinkClick}>
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="flex-1">
                <div className="md:hidden flex justify-between items-center p-4 bg-orange-400">
                    <FaBars className="text-white text-2xl cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
                    <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                </div>
                {location.pathname === "/dashboard" && (
                    <Navigate to={defaultPath} replace />
                )}
                <Outlet />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
        </div>
    );
};

export default Dashboard;
