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

const CheckOutForm = ({ classes }) => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // console.log(classes);

    // match the user to auth data
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data;
        }
    })
    // console.log(users);

    // payment class
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?studentEmail=${user.email}`);
            return res.data;
        }
    })
    // console.log(payments);

    const matchClass = payments.find(clas => clas.courseId === classes._id)
    // console.log(matchClass);


    useEffect(() => {
        axiosSecure
            .post('/create-payment-intent', { price: classes.price })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, classes.price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // check user role
        if (users[0]?.role === "admin") {
            Swal.fire({
                title: "You are admin ..!",
                icon: "error"
            });
            return;

        }
        else if (users[0]?.role === "teacher") {
            Swal.fire({
                title: "Your are teacher ..!",
                icon: "warning"
            });
            return;
        }
        else if (matchClass) {
            Swal.fire({
                title: "Already enroll this course ..!",
                icon: "warning"
            });
            return;
        }


        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    studentEmail: user.email,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    courseId: classes._id,
                    title: classes.title,
                    image: classes.image,
                    price: classes.price,
                    name: classes.name,
                    email: classes.email,
                    description: classes.description,
                    enrolment: classes.enrolment + 1,
                };

                const res = await axiosSecure.post('/payments', payment);
                console.log(res);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Payment Successfull..!",
                        icon: "success"
                    });

                    axios.patch(`http://localhost:5000/classes/${classes._id}`,{ status: 'accepted' , enrolment: "1"})
                    .then(res =>{
                        console.log(res.data);
                        navigate('/dashboard/myEnrollClass');
                    })
                    

                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-20 mt-5 max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl">
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                <CardNumberElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Expiration Date</label>
                <CardExpiryElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">CVC</label>
                <CardCvcElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            {error && <p className="text-red-600 text-lg mt-4">{error}</p>}
            {transactionId && <p className="text-green-600 text-lg mt-4">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;
