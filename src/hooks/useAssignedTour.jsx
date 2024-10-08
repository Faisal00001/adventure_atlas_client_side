import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAssignedTour = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: assignedTours = [], isPending: assignedToursLoading, refetch } = useQuery({
        queryKey: ['assignedTours', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tourGuideAssignedTours?email=${user?.email}`);
            return res.data;
        }
    })
    return [assignedTours, assignedToursLoading, refetch]
};

export default useAssignedTour;