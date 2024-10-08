import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBookings = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: bookings = [], isPending: bookingLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
    })
    return [bookings, bookingLoading, refetch]
}

export default useBookings;