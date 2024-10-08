
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



// import required modules
import { useNavigate } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import useTouristStory from '../../hooks/useTouristStory';
const TouristStory = () => {
    const [touristStory, touristStoryLoading] = useTouristStory()

    const navigate = useNavigate()
    if (touristStoryLoading) {
        return "Loading"
    }
    const handleTouristStroy = (_id) => {
        navigate(`/touristStory/${_id}`)
    }
    return (
        <div>
            <h3 className='text-2xl text-center font-bold md:text-4xl mb-10 mt-24'>Tourist Story</h3>
            <div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    pagination={{
                        clickable: true,
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}

                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {
                        touristStory.map(story => <SwiperSlide onClick={() => handleTouristStroy(story._id)} key={story._id} className='w-[60%] md:w-[30%] mb-20 cursor-pointer'>
                            <div className="avatar flex justify-center mt-10 mb-5">
                                <div className="w-44 rounded-full">
                                    <img src={story.image} />
                                </div>

                            </div>
                            <div>
                                <h3 className='text-base  text-center px-5'>Experience : {story.experience}</h3>
                            </div>

                        </SwiperSlide>)
                    }


                </Swiper>
            </div>
        </div>
    );
};

export default TouristStory;