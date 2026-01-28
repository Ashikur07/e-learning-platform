import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

const CheckOutForm = ({ classes }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const elementStyles = {
        style: {
            base: {
                fontSize: '16px',
                color: '#1e293b',
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': { color: '#94a3b8' },
            },
            invalid: { color: '#ef4444' },
        },
    };

    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data;
        }
    });

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?studentEmail=${user.email}`);
            return res.data;
        }
    });

    const matchClass = payments.find(clas => clas.courseId === classes._id);

    useEffect(() => {
        if (classes.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: classes.price })
                .then((res) => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, classes.price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (users[0]?.role === "admin" || users[0]?.role === "teacher" || matchClass) {
            Swal.fire({ title: "Restricted", text: "Admin/Teachers cannot enroll, or you're already enrolled.", icon: "warning" });
            return;
        }

        if (!stripe || !elements) return;
        setProcessing(true);

        const card = elements.getElement(CardNumberElement);
        const { error: methodError } = await stripe.createPaymentMethod({ type: 'card', card });

        if (methodError) {
            setError(methodError.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: { email: user?.email || 'anonymous', name: user?.displayName || 'anonymous' },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                studentEmail: user.email,
                date: new Date(),
                transactionId: paymentIntent.id,
                courseId: classes._id,
                title: classes.title,
                price: classes.price,
                image: classes.image,
                instructorName: classes.name
            };

            const res = await axiosSecure.post('/payments', payment);
            if (res.data.insertedId) {
                Swal.fire({ title: "Paid!", text: "Successfully enrolled in the course.", icon: "success" });
                axios.patch(`${import.meta.env.VITE_API_URL}/classes/${classes._id}`, { status: 'accepted', enrolment: 1 })
                    .then(() => navigate('/dashboard/myEnrollClass'));
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-5">
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 ring-indigo-500/20 transition-all">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Credit Card Number</label>
                    <CardNumberElement options={elementStyles} />
                </div>
                
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 p-5 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 ring-indigo-500/20 transition-all">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Expiry Date</label>
                        <CardExpiryElement options={elementStyles} />
                    </div>
                    <div className="flex-1 p-5 bg-slate-50 border border-slate-100 rounded-2xl focus-within:ring-2 ring-indigo-500/20 transition-all">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">CVC Code</label>
                        <CardCvcElement options={elementStyles} />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest text-sm ${(!stripe || !clientSecret || processing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? "Authorizing..." : `Confirm Payment - $${classes.price}`}
                </motion.button>
            </div>

            {error && <p className="text-red-500 text-sm font-bold text-center italic mt-4">Error: {error}</p>}
            
            {/* Payment Partner Logos - Official SVG Sources */}
            <div className="flex justify-center items-center gap-10 pt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 lg:h-5" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-7 lg:h-9" alt="MasterCard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-5 lg:h-7" alt="Stripe" />
            </div>
        </form>
    );
};

export default CheckOutForm;