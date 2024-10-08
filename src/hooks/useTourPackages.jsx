import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTourPackages = () => {
    const axiosPublic = useAxiosPublic()
    const { data: tourPackages = [], isPending: packagesLoading, refetch } = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tourPackages');
            return res.data;
        }
    })
    return [tourPackages, packagesLoading, refetch]
};

export default useTourPackages;