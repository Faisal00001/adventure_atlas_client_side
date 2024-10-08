import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useGuide = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTourGuide, isPending: isTourGuideLoading } = useQuery({
        queryKey: [user?.email, 'isTourGuide'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourGuide/${user.email}`);
            return res.data?.tourGuide;
        }
    })
    return [isTourGuide, isTourGuideLoading]
};

export default useGuide;