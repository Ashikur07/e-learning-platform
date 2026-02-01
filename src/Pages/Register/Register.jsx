import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../Provider/AuthProvider';
import { FaGraduationCap, FaUser, FaLink, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import { updateProfile } from 'firebase/auth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Register = () => {
    useEffect(() => {
        document.title = 'LearnQuest | Register';
    }, []);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createNewUser, setUser } = useContext(AuthContext);
    
    // Interaction States
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    
    const currentTheme = localStorage.getItem("theme") || "light";

    // Smart Monkey Logic inside the field
    const getMonkeyEmoji = () => {
        if (passwordValue.length > 0 && !showPassword) return "🙈"; // Types & Hides
        if (showPassword) return "🐵"; // Peeks
        if (isFocused && passwordValue.length === 0) return "👈"; // Points when empty
        return "🐵"; 
    };

    const handleRegisterWithEmail = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photoUrl = form.photo.value;

        // Validation with SwAl themes
        if (password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Too Short!",
                text: "Password should be at least 6 characters",
                background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
            });
            return;
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                updateProfile(user, { displayName: name, photoURL: photoUrl })
                .then(() => {
                    setUser({ ...user, photoURL: photoUrl, displayName: name });

                    const userInfo = { name, email, role: "student", image: photoUrl };
                    
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                // Celebration Effect
                                confetti({
                                    particleCount: 150,
                                    spread: 70,
                                    origin: { y: 0.6 },
                                    colors: ['#6366f1', '#a855f7', '#ec4899']
                                });

                                Swal.fire({
                                    title: "Welcome to LearnQuest!",
                                    text: "Your account is ready.",
                                    icon: "success",
                                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                navigate('/');
                            }
                        });
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message,
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a',
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-5 py-10 transition-colors duration-300 relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[500px] w-full bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl p-8 lg:p-12 relative z-10"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="p-4 bg-primary rounded-[1.5rem] shadow-xl mb-4 text-white">
                        <FaGraduationCap className="text-4xl" />
                    </div>
                    <h1 className="text-3xl font-black text-base-content uppercase tracking-tighter leading-none">Create Account</h1>
                    <p className="text-[10px] opacity-40 font-black uppercase tracking-[0.3em] mt-2">Join our learning community</p>
                </div>

                <form onSubmit={handleRegisterWithEmail} className="space-y-4">
                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Full Name</span></label>
                        <div className="relative">
                            <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium pl-12" type="text" name="name" placeholder="Ashik Ali" required />
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" />
                        </div>
                    </div>

                    {/* Photo URL Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Profile Image URL</span></label>
                        <div className="relative">
                            <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium pl-12" type="text" name="photo" placeholder="https://..." required />
                            <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Email Address</span></label>
                        <div className="relative">
                            <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium pl-12" type="email" name="email" placeholder="mail@ict.iu" required />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" />
                        </div>
                    </div>

                    {/* Interactive Monkey Password Field */}
                    <div className="form-control">
                        <label className="label flex justify-between items-end">
                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Security Key</span>
                            <div className="relative h-10 w-10 flex items-center justify-center text-3xl mb-[-5px]">
                                <AnimatePresence mode="wait">
                                    <motion.span key={getMonkeyEmoji()} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        {getMonkeyEmoji()}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </label>
                        <div className="relative">
                            <input
                                className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary transition-all font-medium pr-16 py-7 tracking-widest"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                required 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center hover:bg-base-300 rounded-xl transition-all">
                                <span className="text-xl">{showPassword ? "🐵" : "🙈"}</span>
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all text-white border-none mt-6">
                        Register Now
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-base-300 pt-6">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
                        Already have an account? 
                        <Link to='/login' className="text-primary font-black ml-2 hover:underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;