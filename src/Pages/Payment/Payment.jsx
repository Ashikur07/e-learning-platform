import { loadStripe } from "@stripe/stripe-js";
import Heading from "../../components/Heading/Heading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Payment = () => {

    const classes = useLoaderData();
    console.log(classes);

    return (
        <div>
            <div className="mt-5">
                <Heading title="Payment Now"></Heading>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm classes={classes}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;