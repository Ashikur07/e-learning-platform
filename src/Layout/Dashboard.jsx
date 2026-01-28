import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaList, FaUsers, FaHome, FaBars, FaGraduationCap } from "react-icons/fa";
import { IoBookmarksSharp, IoPersonAdd, IoLogOut } from "react-icons/io5";
import { MdBookmarkAdd, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [userInfo, setUserInfo] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const location = useLocation();

    // Theme Logic - Optimized to prevent errors
    const applyTheme = useCallback((newTheme) => {
        const html = document.querySelector('html');
        html.setAttribute('data-theme', newTheme);
        html.style.colorScheme = newTheme; // Browser level fix
        localStorage.setItem("theme", newTheme);
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`)
            .then(res => setUserInfo(res.data))
            .catch(err => console.error("User fetch error:", err));
    }, [user.email]);

    const role = userInfo[0]?.role;

    const getDefaultPath = (role) => {
        switch (role) {
            case 'admin': return "/dashboard/teacherRequest";
            case 'teacher': return "/dashboard/myClass";
            case 'student': return "/dashboard/myEnrollClass";
            default: return "/dashboard";
        }
    };

    const defaultPath = getDefaultPath(role);

    return (
        <div className="flex h-screen bg-base-100 text-base-content overflow-hidden font-sans transition-colors duration-500">
            
            {/* Sidebar Container */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-500 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}>
                
                <div className="flex flex-col h-full p-6">
                    
                    {/* Top Section: Brand & Theme Switcher */}
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/40">
                                <FaGraduationCap className="text-white text-xl" />
                            </div>
                            <h1 className="text-lg font-black tracking-tighter text-white uppercase">LearnQuest</h1>
                        </div>

                        {/* Theme Switcher at Top */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all active:scale-90 border border-slate-700/50 shadow-inner"
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? <MdOutlineDarkMode className="text-xl text-indigo-400" /> : <MdOutlineLightMode className="text-xl text-yellow-500" />}
                        </button>
                    </div>

                    {/* User Profile Card */}
                    <div className="mb-8 p-4 bg-slate-800/50 rounded-3xl border border-slate-700/50 text-center relative group">
                        <div className="avatar mb-4">
                            <div className="w-20 rounded-2xl ring-4 ring-indigo-500/20 mx-auto transition-transform group-hover:scale-105 overflow-hidden">
                                <img src={user?.photoURL} alt="Profile" />
                            </div>
                        </div>
                        <h2 className="text-lg font-bold text-white truncate px-2">{user?.displayName}</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mt-1">{role || 'User'}</p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2 pt-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4 border-l-2 border-indigo-500 ml-1">Main Menu</p>
                        
                        {role === "student" && (
                            <>
                                <NavItem to='/dashboard/myEnrollClass' icon={<IoBookmarksSharp />} label="Enrolled Classes" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/profile' icon={<FaList />} label="My Profile" closeSidebar={() => setSidebarOpen(false)} />
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <NavItem to='/dashboard/teacherRequest' icon={<IoPersonAdd />} label="Instructor Requests" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/users' icon={<FaUsers />} label="Manage Users" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/allClasses' icon={<IoBookmarksSharp />} label="Course Catalog" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/profile' icon={<FaList />} label="Admin Profile" closeSidebar={() => setSidebarOpen(false)} />
                            </>
                        )}

                        {role === "teacher" && (
                            <>
                                <NavItem to='/dashboard/addclass' icon={<MdBookmarkAdd />} label="Create Class" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/myClass' icon={<IoBookmarksSharp />} label="My Courses" closeSidebar={() => setSidebarOpen(false)} />
                                <NavItem to='/dashboard/profile' icon={<FaList />} label="Instructor Profile" closeSidebar={() => setSidebarOpen(false)} />
                            </>
                        )}

                        <div className="pt-8 space-y-2 border-t border-slate-800 mt-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4">Navigation</p>
                            <NavItem to='/' icon={<FaHome />} label="Back to Home" closeSidebar={() => setSidebarOpen(false)} />
                            <button onClick={logOut} className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-sm">
                                <IoLogOut className="text-xl" /> Logout
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="lg:hidden flex justify-between items-center p-5 bg-base-100 border-b border-base-300">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 bg-base-200 rounded-xl text-base-content">
                        <FaBars />
                    </button>
                    <span className="font-black tracking-tighter uppercase">Dashboard</span>
                    <img src={user?.photoURL} className="w-10 h-10 rounded-xl border border-base-300" alt="" />
                </header>

                <section className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-base-200/30 relative">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {location.pathname === "/dashboard" && (
                                <Navigate to={defaultPath} replace />
                            )}
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
        </div>
    );
};

const NavItem = ({ to, icon, label, closeSidebar }) => (
    <NavLink 
        to={to} 
        onClick={closeSidebar}
        className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
        }
    >
        <span className="text-xl">{icon}</span>
        {label}
    </NavLink>
);

export default Dashboard;