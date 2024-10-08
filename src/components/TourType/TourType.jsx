import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';




// import required modules
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import useTourPackages from '../../hooks/useTourPackages';

const TourType = () => {
    const [tourPackages, packagesLoading] = useTourPackages()

    const navigate = useNavigate()
    if (packagesLoading) {
        return "Loading"
    }
    const uniqueTourTypes = []
    for (const item of tourPackages) {
        if (!uniqueTourTypes.includes(item.tourType)) {
            uniqueTourTypes.push(item.tourType)
        }
    }
    const uniqueTour = uniqueTourTypes.map(tourType => {
        let tour = tourPackages.find(tour => tour.tourType === tourType)
        return tour
    })


    const handleTourType = (tourType) => {
        navigate(`/TourTypeItems/${tourType}`)
    }
    return (
        <div>
            <div>
                <h3 className="text-2xl mb-20 text-center font-bold md:text-4xl">Tour Types</h3>
            </div>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper px-5 mb-20"
                    breakpoints={
                        {
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },

                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }
                    }
                >

                    {
                        uniqueTour.map((tour, index) => <SwiperSlide onClick={() => handleTourType(tour.tourType)} className='bg-base-200 h-[300px] cursor-pointer' key={index} >
                            <div>
                                <div className="avatar flex justify-center mt-8">
                                    <div className="w-44 rounded-full">
                                        <img src={tour.image} />
                                    </div>
                                </div>
                                <h3 className='text-xl mt-5 font-bold md:text-2xl text-center'> {tour.tourType}</h3>
                            </div>
                        </SwiperSlide>)
                    }


                </Swiper>
            </div>

        </div>
    );
};

export default TourType;