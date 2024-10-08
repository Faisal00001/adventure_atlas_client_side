import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyWishList = () => {
    const axiosPublic = useAxiosSecure()
    const { user } = useAuth()
    const { data: wishList = [], isPending: wishListLoading, refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/myWishList?email=${user?.email}`);
            return res.data;
        }
    })
    return [wishList, wishListLoading, refetch]

};

export default useMyWishList;