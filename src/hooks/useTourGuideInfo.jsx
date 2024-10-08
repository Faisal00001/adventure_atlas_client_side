import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTourGuideInfo = () => {
    const axiosPublic = useAxiosPublic()
    const { data: guideInfo = [], isPending: guideInfoLoading, refetch } = useQuery({
        queryKey: ['guideInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tourGuideInfo');
            return res.data;
        }
    })
    return [guideInfo, guideInfoLoading, refetch]
};

export default useTourGuideInfo;