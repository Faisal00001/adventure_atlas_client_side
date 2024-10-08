
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyWishList from '../../hooks/useMyWishList';
const OurPackagesCard = ({ tourPackage }) => {
    const { user } = useAuth()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const { _id, image, tourType, tripTitle, price } = tourPackage
    const navigate = useNavigate()
    const [, , refetch] = useMyWishList()

    const handlePackage = (_id) => {
        navigate(`/packageDetails/${_id}`)
    }
    const handleMyWishList = () => {

        if (user && user.email) {
            const wishListItem = {
                wishListId: _id,
                email: user.email,
                tripTitle,
                tourType,
                price,
                image,
                packageDetail: tourPackage.packageDetail,
                gallery: tourPackage.gallery,
                aboutTheTour: tourPackage.aboutTheTour,
                tourPlan: tourPackage.tourPlan
            }
            axiosSecure.post('/myWihList', wishListItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: `${tripTitle} Package Added to wish List`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()

                    }
                })
                .catch(error => {
                    console.log(error.message)
                })

        }
        else {
            Swal.fire({
                title: "You are not Logged",
                text: "Please Login to add item to your wish list!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   Send user to login
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="card card-compact  bg-base-100 shadow-xl relative">
                    <figure><img className='h-[250px] w-full' src={image} alt="Package" /></figure>
                    <div className="card-body ">
                        <h2 className="card-title">{tourType}</h2>
                        <h2 className="card-title">{tripTitle}</h2>
                        <p className='text-base font-medium'>Price : ${price}</p>
                        <div className="card-actions justify-center my-5">
                            <button onClick={() => handlePackage(_id)} className="btn rounded-lg hover:bg-black bg-black text-white">View Package</button>
                        </div>

                    </div>
                    <FaHeart onClick={handleMyWishList} className={`text-4xl text-black  hover:text-red-500 cursor-pointer absolute top-7  right-7 `} />
                </div>
            </motion.div>

        </div>
    );
};
OurPackagesCard.propTypes = {
    tourPackage: PropTypes.object.isRequired
}
export default OurPackagesCard;