import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BannerContent from './BannerContent';


const Banner = () => {


    const backgroundImageUrl1 = "https://i.ibb.co/zZN064Z/photo-1610552254576-9500a3e99999-q-80-w-1434-auto-format-fit-crop-ixlib-rb-4-0.jpg";

    const backgroundImageUrl2 = "https://i.ibb.co/KVtrH6r/photo-1488190211105-8b0e65b80b4e-q-80-w-1470-auto-format-fit-crop-ixlib-rb-4-0.jpg";

    const backgroundImageUrl3 = "https://i.ibb.co/m9nfMvS/photo-1629360021730-3d258452c425-q-80-w-1470-auto-format-fit-crop-ixlib-rb-4-0.jpg";



    const backgroud1 = {
        backgroundImage: `url(${backgroundImageUrl1})`,

    }; const backgroud2 = {
        backgroundImage: `url(${backgroundImageUrl2})`,

    }; const backgroud3 = {
        backgroundImage: `url(${backgroundImageUrl3})`,

    };


    return (
        <div className=''>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 400000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div style={backgroud1} className='bg-no-repeat bg-cover bg-center lg:h-[650px] '>
                        {
                          <BannerContent></BannerContent>
                        }
                    </div>

                </SwiperSlide>

                <SwiperSlide>
                    <div style={backgroud2} className='bg-no-repeat bg-cover bg-center lg:h-[650px]'>
                        {
                            <BannerContent></BannerContent>
                        }
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div style={backgroud3} className=' bg-no-repeat bg-cover bg-center lg:h-[650px]'>
                        {
                            <BannerContent></BannerContent>
                        }
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;