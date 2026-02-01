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
    const location = useLocation();
    const { createUserWithGoogle, signInUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
    // States for interaction
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    
    const currentTheme = localStorage.getItem("theme") || "light";
    const googleProvider = new GoogleAuthProvider();

    // Logic for Monkey Emojis based on User Action
    const getMonkeyEmoji = () => {
        if (passwordValue.length > 0 && !showPassword) return "🙈"; // Hide eyes while typing
        if (showPassword) return "🐵"; // Normal face when showing password
        if (isFocused && passwordValue.length === 0) return "👈"; // Pointing finger when focused but empty
        return "🐵"; // Default face
    };

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
                    text: "Invalid credentials.",
                    icon: "error",
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                });
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-5 py-10 transition-colors duration-300 relative">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[450px] w-full bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl p-8 lg:p-12 relative z-10"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-primary rounded-[1.5rem] shadow-xl mb-4">
                        <FaGraduationCap className="text-white text-4xl" />
                    </div>
                    <h1 className="text-3xl font-black text-base-content uppercase tracking-tighter">LearnQuest</h1>
                </div>

                <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-4 w-full py-4 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 transition-all font-bold text-base-content shadow-sm mb-8">
                    <FcGoogle className="text-2xl" /> Continue with Google
                </button>

                <form onSubmit={handleSignInWithEmail} className="space-y-6">
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Email Address</span>
                        </label>
                        <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium" type="email" name="email" placeholder="mail@example.com" required />
                    </div>

                    {/* Interactive Password Field */}
                    <div className="form-control">
                        <label className="label flex justify-between items-end">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Password</span>
                            
                            {/* Animated Monkey State Display */}
                            <div className="relative h-10 w-10 flex items-center justify-center text-4xl">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={getMonkeyEmoji()}
                                        initial={{ y: 10, opacity: 0, scale: 0.5 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ y: -10, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {getMonkeyEmoji()}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </label>
                        
                        <div className="relative">
                            <input
                                className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium pr-14 py-7 tracking-widest"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                required 
                            />
                            {/* Icon inside the field */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-base-300 rounded-xl transition-all active:scale-90"
                            >
                                <span className="text-xl">
                                    {showPassword ? "🐵" : "🙈"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all text-white mt-4 border-none">
                        Login Now
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
                        New to platform? <Link to='/register' className="text-primary font-black ml-2 hover:underline">Register</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;