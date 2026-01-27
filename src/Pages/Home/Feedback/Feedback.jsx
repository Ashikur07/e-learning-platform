import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards'; // Cards effect use korle look change hoye jabe
import { Autoplay, EffectCards, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; 
import { RiDoubleQuotesR } from 'react-icons/ri';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/feedback`)
            .then(res => setFeedbacks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="py-28 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Side: Content & Branding */}
                <div className="space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/5 border border-primary/10">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        <span className="text-primary font-bold text-xs uppercase tracking-widest">User Stories</span>
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black text-base-content leading-tight tracking-tighter">
                        Hear it from <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Our Learners
                        </span>
                    </h2>
                    <p className="text-lg text-base-content/60 font-medium max-w-md mx-auto lg:mx-0">
                        Discover how LearnQuest is helping thousands of students reach their professional goals every day.
                    </p>
                    
                    {/* Stats or trust badge */}
                    <div className="pt-4 flex justify-center lg:justify-start gap-8">
                        <div>
                            <p className="text-3xl font-black text-base-content">4.9/5</p>
                            <p className="text-xs font-bold text-base-content/40 uppercase">Average Rating</p>
                        </div>
                        <div className="w-[1px] h-12 bg-base-300"></div>
                        <div>
                            <p className="text-3xl font-black text-base-content">12k+</p>
                            <p className="text-xs font-bold text-base-content/40 uppercase">Happy Reviews</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Modern Cards Slider */}
                <div className="relative px-10 md:px-20 lg:px-0">
                    <Swiper 
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, Autoplay, Navigation]} 
                        autoplay={{ delay: 4000 }}
                        className="mySwiper w-full max-w-[320px] md:max-w-[400px]"
                    >
                        {feedbacks.map(review => (
                            <SwiperSlide key={review._id} className="rounded-[2.5rem] bg-base-200 border border-base-300 shadow-2xl p-8 lg:p-10 flex flex-col">
                                
                                <RiDoubleQuotesR className="text-5xl text-primary/20 mb-4 ml-auto" />
                                
                                <p className="text-base-content/80 font-semibold text-lg leading-relaxed mb-8 flex-grow">
                                    {review.description}
                                </p>

                                <div className="space-y-4">
                                    <Rating style={{ maxWidth: 100 }} value={review.ratings} readOnly />
                                    
                                    <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                                        {review.photoURL ? (
                                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
                                                <img src={review.photoURL} alt={review.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <FaUserCircle className="text-5xl text-base-content/20" />
                                        )}
                                        <div>
                                            <h4 className="font-black text-base-content tracking-tight">{review.name}</h4>
                                            <p className="text-[10px] font-bold text-primary uppercase">Verified Learner</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Decorative Background Glow */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;