import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TourGuideProfile = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [rating, setRating] = useState(null)
    const { data: tourGuideProfileDetails = [], isPending: tourGuideProfileLoading } = useQuery({
        queryKey: ['tourGuideProfileDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tourGuideInfo/${id}`);
            return res.data;
        }
    })
    if (tourGuideProfileLoading) {
        return "Loading"
    }
    const handleRating = (event) => {
        setRating(event.target.value)
    }
    const handleGuideComment = (event) => {
        event.preventDefault()
        const form = event.target
        const comment = form.comment.value
        const review = {
            rating,
            comment
        }
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/userReview', review)
                    .then(res => {
                        if (res.data.insertedId) {
                            form.reset()
                            Swal.fire("Saved!", "", "success");
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }
    return (
        <div>
            <div className="pt-20 container mx-auto">
                <div className="my-24">
                    <h3 className="text-center text-2xl md:text-4xl font-bold">Tour Guide Profile</h3>
                    <div>
                        <div className="card card-compact  mt-16 mx-auto w-[80%] px-5 bg-base-100 shadow-xl">
                            <figure><img className="w-full" src={tourGuideProfileDetails.image} alt="Tour Guide" /></figure>
                            <div className="card-body mb-10">
                                <h2 className="card-title">{tourGuideProfileDetails.name}</h2>
                                <p className="font-medium">Experience : {tourGuideProfileDetails.experience}</p>
                                <p className="font-medium">Languages known :
                                    {
                                        tourGuideProfileDetails.languages.map((language, index) => <span className="pl-2" key={index}>
                                            {
                                                language + '.'
                                            }
                                        </span>)
                                    }
                                </p>
                                <p className="font-medium">Skills :
                                    {
                                        tourGuideProfileDetails.specialties.map((skill, index) => <span className="pl-2" key={index}>
                                            {
                                                skill + '.'
                                            }
                                        </span>)
                                    }
                                </p>
                                <p className="font-medium">Rating: {tourGuideProfileDetails.rating}</p>
                                <p className="font-medium">Availability: {tourGuideProfileDetails.availability}</p>
                                <p className="font-medium">Contact : {tourGuideProfileDetails.contactDetails}</p>

                            </div>
                        </div>
                    </div>
                    {

                    }
                    {
                        user ? <section className="mt-20">
                            <h3 className="text-center text-2xl md:text-4xl font-bold mb-16">User Review</h3>


                            <form onSubmit={handleGuideComment} className="max-w-sm mx-auto px-5">
                                <div className="mb-5 flex gap-5">
                                    <label htmlFor="Rating" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Rating</label>
                                    <div onChange={handleRating} className="rating rating-md">

                                        <input value={1} type="radio" name="rating-9" className="mask mask-star-2 bg-red-500" />
                                        <input value={2} type="radio" name="rating-9" className="mask mask-star-2 bg-red-500" />
                                        <input value={3} type="radio" name="rating-9" className="mask mask-star-2 bg-red-500" />
                                        <input value={4} type="radio" name="rating-9" className="mask mask-star-2 bg-red-500" />
                                        <input value={5} type="radio" name="rating-9" className="mask mask-star-2 bg-red-500" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comments</label>
                                    <textarea name="comment" rows={4} type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                </div>


                                <button type="submit" className="text-white w-full bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>

                        </section> : ''
                    }

                </div>

            </div>

        </div>
    );
};

export default TourGuideProfile;