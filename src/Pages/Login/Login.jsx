import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaGraduationCap } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
    useEffect(() => {
        document.title = 'LearnQuest | Login';
    }, []);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const { createUserWithGoogle, signInUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
    // Theme sync for SweetAlert
    const currentTheme = localStorage.getItem("theme") || "light";

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        createUserWithGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                    role: "student",
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            title: "Welcome Back!",
                            text: "Login successful.",
                            icon: "success",
                            background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                            color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate(location?.state ? location.state : '/');
                    })
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "Google sign-in failed.",
                    icon: "error",
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                });
            })
    }

    const handleSignInWithEmail = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => {
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    icon: "error",
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                });
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-5 py-10 transition-colors duration-300 relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-[450px] w-full bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl p-8 lg:p-12 relative z-10"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-8">
                    <motion.div 
                        whileHover={{ rotate: 10 }}
                        className="p-4 bg-primary rounded-[1.5rem] shadow-xl shadow-primary/30 mb-4"
                    >
                        <FaGraduationCap className="text-white text-4xl" />
                    </motion.div>
                    <h1 className="text-3xl font-black tracking-tighter text-base-content uppercase">LearnQuest</h1>
                    <p className="text-[10px] opacity-40 font-black uppercase tracking-[0.3em] mt-1">LMS Platform</p>
                </div>

                {/* Google Sign In */}
                <button 
                    onClick={handleGoogleSignIn} 
                    className="flex items-center justify-center gap-4 w-full py-4 px-6 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all font-bold text-sm text-base-content shadow-sm active:scale-95 mb-8"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>

                <div className="flex mb-8 items-center gap-4">
                    <div className="h-[1px] flex-1 bg-base-300"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">Credentials</span>
                    <div className="h-[1px] flex-1 bg-base-300"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSignInWithEmail} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Email Address</span>
                        </label>
                        <input 
                            className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium py-7" 
                            type="email" 
                            name="email" 
                            placeholder="ashik@ict.iu" 
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label flex justify-between items-end">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Password</span>
                            
                            {/* Monkey Head Animation */}
                            <div className="relative h-8 w-8 overflow-hidden flex items-center justify-center text-3xl">
                                <AnimatePresence mode="wait">
                                    {showPassword ? (
                                        <motion.span
                                            key="open"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="cursor-default"
                                        >
                                            🐵
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="closed"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="cursor-default"
                                        >
                                            🙈
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </label>
                        
                        <div className="relative">
                            <input
                                className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium pr-14 py-7 tracking-widest"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-base-300 rounded-xl transition-all active:scale-90"
                            >
                                <span className="text-xl grayscale hover:grayscale-0 transition-all">
                                    {showPassword ? "🙉" : "🙈"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white mt-4 border-none">
                        Login Now
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
                        New to LearnQuest? 
                        <Link to='/register' className="text-primary font-black ml-2 hover:underline">Register</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;