import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../Provider/AuthProvider';
import { FaGraduationCap } from "react-icons/fa";
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

    // Same Monkey Logic as Login
    const getMonkeyEmoji = () => {
        if (passwordValue.length > 0 && !showPassword) return "🙈"; // Types & Hides
        return "🐵"; // Default Open Monkey
    };

    const handleRegisterWithEmail = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photoUrl = form.photo.value;

        // Validation...
        if (password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Too Short",
                text: "Password must be at least 6 characters",
                background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a'
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
                                // Celebration on Success
                                confetti({
                                    particleCount: 150,
                                    spread: 70,
                                    origin: { y: 0.6 }
                                });

                                Swal.fire({
                                    title: "Welcome!",
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
                    title: "Failed",
                    text: error.message,
                    background: currentTheme === 'dark' ? '#1e293b' : '#ffffff',
                    color: currentTheme === 'dark' ? '#f8fafc' : '#0f172a'
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-5 py-10 transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[450px] w-full bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl p-8 lg:p-12 relative overflow-hidden"
            >
                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-primary rounded-[1.5rem] shadow-xl mb-4 text-white">
                        <FaGraduationCap className="text-4xl" />
                    </div>
                    <h1 className="text-3xl font-black text-base-content uppercase tracking-tighter leading-none">Create Account</h1>
                    <p className="text-[10px] opacity-40 font-black uppercase tracking-[0.3em] mt-2">Join LearnQuest Today</p>
                </div>

                <form onSubmit={handleRegisterWithEmail} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Full Name</span></label>
                        <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium" type="text" name="name" placeholder="John Doe" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Photo URL</span></label>
                        <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium" type="text" name="photo" placeholder="https://image-link.com" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Email Address</span></label>
                        <input className="input input-bordered w-full rounded-2xl bg-base-200 border-none py-7 font-medium" type="email" name="email" placeholder="mail@example.com" required />
                    </div>

                    {/* Interactive Monkey Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-widest opacity-60">Security Key</span></label>
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
                            
                            {/* Integrated Monkey Trigger */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center hover:bg-base-300 rounded-xl transition-all overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={getMonkeyEmoji()}
                                        initial={{ y: 15, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -15, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-2xl"
                                    >
                                        {getMonkeyEmoji()}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all text-white border-none mt-6">
                        Register Now
                    </button>
                </form>

                <div className="mt-8 text-center text-xs font-bold opacity-60 uppercase tracking-widest">
                    Already have an account? <Link to='/login' className="text-primary font-black ml-2 hover:underline">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;