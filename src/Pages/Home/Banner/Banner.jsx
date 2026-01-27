import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const Banner = () => {
    const slides = [
        {
            image: "https://i.ibb.co/zZN064Z/photo-1610552254576-9500a3e99999-q-80-w-1434-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            title: "Learn at Home",
            tag: "Flexible Learning",
            desc: "Join 50k+ students worldwide learning from the comfort of their home."
        },
        {
            image: "https://i.ibb.co/KVtrH6r/photo-1488190211105-8b0e65b80b4e-q-80-w-1470-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            title: "Shape Your Future",
            tag: "Expert Mentors",
            desc: "Get industry-ready with our advanced curriculum and live project support."
        },
        {
            image: "https://i.ibb.co/m9nfMvS/photo-1629360021730-3d258452c425-q-80-w-1470-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            title: "Deep Knowledge",
            tag: "Premium Content",
            desc: "Access a library of 1000+ courses covering every tech stack imaginable."
        }
    ];

    return (
        <section className='relative mt-4 lg:mt-6 mx-2 lg:mx-[5%]'>
            <Swiper
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                speed={1200}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper h-[500px] md:h-[600px] lg:h-[750px] rounded-[1.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="relative w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Adaptive Overlay: Mobile-e ektu beshi dark jate font fute uthe */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/30 lg:to-transparent flex items-end lg:items-center">
                                
                                <div className="w-full container mx-auto px-6 md:px-12 lg:px-24 pb-12 lg:pb-0">
                                    <div className="max-w-4xl space-y-4 lg:space-y-8">
                                        
                                        {/* Tag with Glow Effect */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20">
                                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                            <span className="text-white font-bold tracking-[0.15em] text-[10px] lg:text-xs uppercase">
                                                {slide.tag}
                                            </span>
                                        </div>

                                        {/* Responsive Typography */}
                                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
                                            {slide.title.split(' ')[0]} <br className="hidden lg:block" />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                                                {slide.title.split(' ').slice(1).join(' ')}
                                            </span>
                                        </h1>

                                        <p className="text-gray-300 text-sm md:text-lg lg:text-2xl max-w-2xl font-medium leading-relaxed opacity-90">
                                            {slide.desc}
                                        </p>

                                        {/* Button Group - Mobile-e stack hobe, tablet up-e row */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
                                            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-extrabold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30">
                                                Enroll Now
                                            </button>
                                            
                                            <button className="w-full sm:w-auto px-8 py-4 border-2 border-white/20 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-white hover:text-black transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Premium CSS Overrides */}
            <style jsx="true">{`
                /* Hide Navigation Arrows on Mobile */
                @media (max-width: 768px) {
                    .swiper-button-next, .swiper-button-prev {
                        display: none !important;
                    }
                }
                
                .swiper-button-next, .swiper-button-prev {
                    color: white !important;
                    background: rgba(255, 255, 255, 0.05);
                    width: 60px;
                    height: 60px;
                    border-radius: 20px;
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: rgba(124, 58, 237, 0.2);
                    border-color: #7c3aed;
                }

                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 20px !important;
                }

                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.5;
                }

                .swiper-pagination-bullet-active {
                    background: #7c3aed !important;
                    width: 30px !important;
                    border-radius: 5px !important;
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default Banner;