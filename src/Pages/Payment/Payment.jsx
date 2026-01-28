import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Payment = () => {
    const classes = useLoaderData();

    return (
        // bg-slate-50 bad diye bg-base-100 kora holo adaptive theme er jonno
        <div className="min-h-screen bg-base-100 text-base-content pt-10 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section with Adaptive Colors */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-3"
                >
                    <h1 className="text-4xl font-black tracking-tight uppercase">Checkout</h1>
                    <p className="opacity-60 font-medium italic">Complete your enrollment by making a secure payment.</p>
                    <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Side: Order Summary (Using bg-base-200) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-[40%] bg-base-200 p-8 rounded-[2.5rem] border border-base-300 shadow-xl"
                    >
                        <h3 className="text-xl font-black mb-6 border-b border-base-300 pb-4 uppercase tracking-tighter">Order Summary</h3>
                        <div className="space-y-6">
                            <div className="relative h-40 overflow-hidden rounded-2xl shadow-inner">
                                <img src={classes?.image} className="w-full h-full object-cover" alt={classes.title} />
                                <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                                    ${classes.price}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-extrabold leading-tight">{classes.title}</h4>
                                <p className="text-xs opacity-50 font-bold uppercase tracking-widest italic">{classes.name}</p>
                            </div>
                            <div className="pt-6 border-t border-base-300 flex justify-between items-center">
                                <span className="font-bold opacity-60">Total Amount</span>
                                <span className="text-3xl font-black text-indigo-600">${classes.price}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Payment Form (Using bg-base-200) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-[60%] bg-base-200 p-8 lg:p-12 rounded-[2.5rem] border border-base-300 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Logo Watermark with low opacity */}
                        <div className="absolute top-8 right-8 p-4 opacity-5 hidden lg:block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="w-24 grayscale brightness-100 dark:invert" alt="Stripe" />
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-xl font-black">Payment Details</h3>
                            <p className="text-sm opacity-50 font-medium">Safe & Secure encrypted payment</p>
                        </div>

                        <Elements stripe={stripePromise}>
                            <CheckOutForm classes={classes}></CheckOutForm>
                        </Elements>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Payment;