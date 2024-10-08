import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton } from "react-share";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TouristStoryDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { data: tourStory = [], isPending: tourStoryLoading } = useQuery({
        queryKey: ['tourStory'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/touristStory/${id}`);
            return res.data;
        }
    })
    // const shareUrl = "http://github.com";
    const shareUrl = `https://adventureatlas-aa476.web.app/touristStory/${tourStory._id}`;
    if (tourStoryLoading) {
        return "Loading"
    }
    const handleAllStories = () => {
        navigate('/touristAllStories')
    }

    return (
        <div>
            <div className="pt-20 container mx-auto">
                <div className="mt-24 mb-10">
                    <h3 className="text-center text-2xl md:text-4xl font-bold">Tourist Story</h3>
                </div>
                <div>
                    <div className="mb-24">
                        <div className="card w-[80%] mx-auto card-compact bg-base-100 shadow-xl">
                            <figure><img src={tourStory.image || ''} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Added by  {tourStory.name || ''}</h2>
                                <h2 className="card-title">Spot Name : {tourStory.
                                    spotName || ''}</h2>
                                <p className='text-base text-slate-700'>Description : {tourStory.description || ''}</p>
                                <p className='text-base text-slate-700'>Experience : {tourStory.experience || ''}</p>
                                <div>
                                    <div className="flex gap-5 justify-center mb-5 mt-5">
                                        <h3 className="text-2xl font-semibold">Share this Story</h3>
                                        <FacebookShareButton
                                            url={shareUrl}
                                            className="Demo__some-network__share-button"
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5 mb-10">
                            <button onClick={handleAllStories} className="btn bg-black hover:bg-black text-white">All Stories</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TouristStoryDetails;