import { useNavigate } from "react-router-dom";
import useTouristStory from "../../hooks/useTouristStory";


const TouristAllStories = () => {
    const [touristStory] = useTouristStory()
    const navigate = useNavigate()
    const handleDetails = (_id) => {
        navigate(`/touristStory/${_id}`)
    }
    return (
        <div>
            <div className="pt-20 container mx-auto">
                <div className="my-24">
                    <div>
                        <h3 className="text-center text-2xl md:text-4xl font-bold mb-14">All Tourist Stories</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24 justify-center">
                        {
                            touristStory.map(tourStory => <div key={tourStory._id} className="card w-[80%] mx-auto card-compact bg-base-100 shadow-xl">
                                <figure><img className="h-[300px] w-full" src={tourStory.image || ''} alt="Shoes" /></figure>
                                <div className="card-body">

                                    <h2 className="card-title">{tourStory.
                                        spotName || ''}</h2>
                                    <p className='text-base text-slate-700'>Experience : {tourStory.experience || ''}</p>
                                    <div className="flex justify-center mt-5 mb-10">
                                        <button onClick={() => handleDetails(tourStory._id)} className="btn bg-black hover:bg-black text-white">View Details</button>
                                    </div>
                                </div>
                            </div>)
                        }

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TouristAllStories;