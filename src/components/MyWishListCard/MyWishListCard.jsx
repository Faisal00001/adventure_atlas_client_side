
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useMyWishList from '../../hooks/useMyWishList';
const MyWishListCard = ({ wishListItem }) => {
    const [, , refetch] = useMyWishList()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { _id, wishListId, image, tripTitle, tourType, price } = wishListItem
    const handleVisitDetails = () => {
        navigate(`/packageDetails/${wishListId}`)
    }
    const handleDeleteWishList = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            axiosSecure.delete(`/myWishList/${_id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    }
                    refetch()
                })
        });
    }
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ duration: 0.3 }}>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img className='h-[250px] w-full' src={image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{tripTitle}</h2>
                        <h2 className="card-title">{tourType}</h2>
                        <p>Price : {price}</p>
                        <div className="card-actions justify-center mt-5 mb-5">
                            <button onClick={handleDeleteWishList} className="btn rounded-md bg-red-500 hover:bg-red-500  text-black">Delete</button>
                            <button onClick={handleVisitDetails} className="btn btn-primary rounded-md">Visit Details</button>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};
MyWishListCard.propTypes = {
    wishListItem: PropTypes.object.isRequired
}
export default MyWishListCard;