import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Login = () => {

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const { createUserWithGoogle, signInUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();


    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        createUserWithGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    role: "student",
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: "Login Successfull..!",
                            icon: "success",
                            timer: 2000,
                        });
                        navigate(location?.state ? location.state : '/');
                    })


            })
            .catch()
    }


    const handleSignInWithEmail = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    title: "Login Successfull..!",
                    icon: "success",
                    timer: 2000,
                });
                navigate(location?.state ? location.state : '/');

            })
            .catch(() => {
                // alert('Email or password does not match...! Plese try again')
                Swal.fire({
                    title: "Login Successfull..!",
                    icon: "success",
                    timer: 1500,
                });
            })
    }

    return (
        <div className='bg-[#c2d0d9] px-5 lg:px-0 w-full  py-20'>

            <div className="animate__animated animate__zoomIn mx-auto lg:w-[390px] bg-white rounded-3xl px-8 pb-10">

                <h1 className='text-center text-2xl font-bold py-7'>Please login</h1>

                <button onClick={handleGoogleSignIn} className='border border-[#a39898] w-full p-2 gap-16 flex rounded-md'>
                    <FcGoogle className='text-xl' />
                    <p className='font-semibold'>
                        Sign in with Google
                    </p>
                </button>

                <div className='flex my-6 justify-between items-center'>
                    <p className='flex-grow border-b border-[#a39898]'></p>
                    <p className='px-4'>or</p>
                    <p className='flex-grow border-b border-[#a39898]'></p>
                </div>

                <form onSubmit={handleSignInWithEmail}>
                    <p className='pb-1'>Email Address</p>
                    <input className='p-2 mb-2 border rounded-md w-full border-red-600' type="email" name='email' placeholder='Enter Your email' required />

                    <p className='pb-1'>Password</p>
                    <div className="flex flex-col relative">
                        <input
                            className='p-2 border rounded-md w-full border-red-600'
                            type={showPassword ? "text" : "password"}
                            name="password" id="password"
                            placeholder='Enter your Passoword' required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute left-[250px] lg:left-[290px] top-2 text-xl">
                            {
                                showPassword ? <FaRegEyeSlash /> : <AiOutlineEye />
                            }
                        </span>
                    </div>

                    <button className='font-bold text-white w-full mt-5 p-2 rounded-md border bg-[#1c67bc]'>
                        Login
                    </button>
                </form>

                <h1 className='text-center mt-4'>Do not have an accout? <Link to='/register' className='text-[16px] font-bold'>Register</Link></h1>

            </div>

        </div>

    );
};

export default Login;