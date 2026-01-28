import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Modern icons

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = (e) => setTheme(e.target.checked ? 'dark' : 'light');

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Logged Out",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                background: theme === 'dark' ? '#1f2937' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
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
                <li key={link.path} onClick={() => setIsOpen(false)}>
                    <NavLink 
                        to={link.path}
                        className={({ isActive }) => 
                            `relative px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm lg:text-base tracking-tight ${
                                isActive 
                                ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" 
                                : "text-base-content hover:bg-base-200"
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
        <div className={`fixed top-0 z-50 w-full transition-all duration-500 ${
            isScrolled ? "bg-base-100/80 backdrop-blur-xl shadow-md py-2" : "bg-transparent py-4"
        }`}>
            <div className="navbar px-4 lg:px-[5%] container mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Modern Mobile Menu Toggle */}
                    <div className="lg:hidden mr-2">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="btn btn-ghost btn-circle text-primary transition-transform active:scale-90"
                        >
                            {isOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
                        </button>
                        
                        {/* Animated Mobile Dropdown */}
                        <div className={`absolute top-20 left-4 right-4 p-6 shadow-2xl bg-base-100/95 backdrop-blur-2xl rounded-[2rem] border border-base-300 transition-all duration-300 origin-top ${
                            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                        }`}>
                            <ul className="flex flex-col gap-4 text-center">
                                {links}
                            </ul>
                        </div>
                    </div>

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 lg:w-11 overflow-hidden rounded-xl shadow-inner group-hover:rotate-12 transition-transform duration-500">
                            <img src="https://i.ibb.co/rxmN4Qx/360-F-507665856-d-FXIKJJ4-Sw-ROG0df8-GNPBhqs-ZV44p6jn.jpg" alt="Logo" />
                        </div>
                        <h1 className="text-xl lg:text-3xl font-black tracking-tighter bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                            LearnQuest
                        </h1>
                    </Link>
                </div>

                {/* Navbar Center (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2">
                        {links}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2 lg:gap-4">
                    {/* Theme Toggle (Hidden on very small screens if needed) */}
                    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm lg:btn-md">
                        <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} />
                        <svg className="swap-on fill-current w-5 h-5 text-yellow-500" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        <svg className="swap-off fill-current w-5 h-5 text-slate-500" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/></svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/30 p-0.5 hover:border-primary transition-all shadow-sm">
                                <div className="w-8 lg:w-10 rounded-full">
                                    <img src={user?.photoURL} alt="Profile" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[10] p-4 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-3xl w-52 border border-base-300 space-y-2">
                                <div className="px-2 py-2 mb-2 bg-primary/5 rounded-2xl">
                                    <p className="font-black text-primary truncate text-xs">{user?.displayName}</p>
                                    <p className="text-[10px] opacity-60 truncate">{user?.email}</p>
                                </div>
                                <li><Link to="/dashboard" className="hover:bg-primary hover:text-white rounded-xl py-2 transition-colors font-bold">Dashboard</Link></li>
                                <li><button onClick={handleLogOut} className="hover:bg-error hover:text-white rounded-xl py-2 transition-colors font-bold mt-1 text-error">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary btn-sm lg:btn-md rounded-full px-5 lg:px-8 font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter text-xs lg:text-sm">
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