import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTouristStory = () => {
    const axiosPublic = useAxiosPublic()
    const { data: touristStory = [], isPending: touristStoryLoading, refetch } = useQuery({
        queryKey: ['touristStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/touristStory');
            return res.data;
        }
    })
    return [touristStory, touristStoryLoading, refetch]
};

export default useTouristStory;