import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash, FaGraduationCap } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";

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
                    text: "Google sign-in failed. Please try again.",
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
                    title: "Login Successful!",
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
                    title: "Authentication Failed",
                    text: "Invalid email or password.",
                    icon: "error",
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                });
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-5 py-10 transition-colors duration-300">
            {/* Background Decorative Circles */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-[450px] w-full bg-base-100 rounded-[2.5rem] border border-base-300 shadow-2xl p-8 lg:p-12 relative overflow-hidden"
            >
                {/* Brand Logo & Title */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/30 mb-4">
                        <FaGraduationCap className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-base-content uppercase">LearnQuest</h1>
                    <p className="text-xs opacity-50 font-bold uppercase tracking-[0.2em] mt-1">Sign in to your account</p>
                </div>

                {/* Google Sign In */}
                <button 
                    onClick={handleGoogleSignIn} 
                    className="flex items-center justify-center gap-4 w-full py-3.5 px-6 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all font-bold text-sm text-base-content shadow-sm active:scale-95"
                >
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                </button>

                <div className="flex my-8 items-center gap-4">
                    <div className="h-[1px] flex-1 bg-base-300"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-30">or email</span>
                    <div className="h-[1px] flex-1 bg-base-300"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSignInWithEmail} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Email Address</span>
                        </label>
                        <input 
                            className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium" 
                            type="email" 
                            name="email" 
                            placeholder="mail@example.com" 
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium pr-12"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-40 hover:opacity-100 transition-opacity"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white mt-4 border-none">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm font-medium opacity-60">
                        Don't have an account? 
                        <Link to='/register' className="text-primary font-black ml-2 hover:underline">Register Now</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;