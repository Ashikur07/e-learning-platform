import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import axios from 'axios';


const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/feedback`)
            .then(res => {
                setFeedbacks(res.data);
            })
    }, [])

    console.log(feedbacks);

    return (
        <div className="mt-20 pt-10  pb-20 mx-auto bg-slate-300">

            <h1 className='text-4xl pb-10 font-semibold text-center'>User Feedback</h1>

            <Swiper navigation={true} modules={[Navigation]} loop={true} className="max-w-5xl mySwiper">
                {
                    feedbacks.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 text-center space-y-3">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.ratings}
                                readOnly
                            />

                            <p>{review.description}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>


    );
};

export default Feedback;