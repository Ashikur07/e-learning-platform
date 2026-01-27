import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Handle scroll effect for a modern sticky feel
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Theme persist and apply
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged Out",
                    text: "See you again soon!",
                    icon: "success",
                    background: theme === 'dark' ? '#1f2937' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#000',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Classes', path: '/allclasses' },
        { name: 'Teach on LearnQuest', path: '/teaching' },
    ];

    const links = (
        <>
            {navLinks.map((link) => (
                <li key={link.path}>
                    <NavLink 
                        to={link.path}
                        className={({ isActive }) => 
                            `relative px-3 py-2 transition-all duration-300 font-medium hover:text-primary ${
                                isActive ? "text-primary border-b-2 border-primary" : "text-base-content"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </>
    );

    return (
        <div className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            isScrolled ? "bg-base-100/70 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}>
            <div className="navbar lg:px-[5%] container mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-200 rounded-2xl w-64 border border-base-300">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 lg:w-12 overflow-hidden rounded-xl shadow-md group-hover:scale-110 transition-transform">
                            <img src="https://i.ibb.co/rxmN4Qx/360-F-507665856-d-FXIKJJ4-Sw-ROG0df8-GNPBhqs-ZV44p6jn.jpg" alt="Logo" />
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            LearnQuest
                        </h1>
                    </Link>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-6">
                        {links}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-4">
                    {/* Theme Toggle */}
                    <label className="swap swap-rotate hover:bg-base-300 p-2 rounded-full transition-colors">
                        <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} />
                        <svg className="swap-on fill-current w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        <svg className="swap-off fill-current w-6 h-6 text-slate-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/></svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary p-0.5 shadow-sm">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="Profile" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[10] p-4 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-300 space-y-2">
                                <div className="px-2 py-1 mb-2 border-b border-base-200">
                                    <p className="font-bold text-primary truncate text-sm">{user?.displayName}</p>
                                    <p className="text-[10px] opacity-60 truncate">{user?.email}</p>
                                </div>
                                <li><Link to="/dashboard" className="hover:bg-primary hover:text-white rounded-lg">Dashboard</Link></li>
                                <li><button onClick={handleLogOut} className="hover:bg-error hover:text-white rounded-lg">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary btn-sm lg:btn-md rounded-xl px-6 font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;