

import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const GuiderCard = ({ guide, guideInfoLoading }) => {
    const navigate = useNavigate()
    const { _id, image, name, experience, rating,
        availability } = guide
    if (guideInfoLoading) {
        return "Loading"
    }
    const handleGuideDetails = (_id) => {
        navigate(`/tourGuideProfile/${_id}`)
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
                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure><img className='h-[250px] w-full' src={image} alt="Person" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>Experience : {experience}</p>
                        <p>Rating : {rating}</p>
                        <p>
                            Availability : {
                                availability}</p>
                        <div className="card-actions justify-center my-5">
                            <button onClick={() => handleGuideDetails(_id)} className="btn text-white rounded-lg bg-black hover:bg-black">View Details</button>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};
GuiderCard.propTypes = {
    guide: PropTypes.object.isRequired,
    guideInfoLoading: PropTypes.bool.isRequired
}
export default GuiderCard;