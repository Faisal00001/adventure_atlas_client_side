import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UserProfile = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setSelectedImageFile(file);
    };
    const handleUserStory = async (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const spotName = form.spotName.value
        const description = form.description.value
        const experience = form.experience.value
        const imageFile = { image: selectedImageFile }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const touristStory = {
                name,
                spotName,
                description,
                image: res.data.data.display_url,
                experience
            }
            const touristStoryRes = await axiosSecure.post('/touristStory', touristStory);
            if (touristStoryRes.data.insertedId) {
                form.reset()
                Swal.fire({
                    icon: "success",
                    title: `Story is added.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div>
            <div className="mt-20">
                <div className="px-5">
                    {
                        user ? <h3 className="text-2xl text-center md:text-4xl font-bold">Welcome Back {user.displayName}</h3> : <h3 className="text-2xl text-center md:text-4xl font-bold">
                            Welcome Back
                        </h3>
                    }
                </div>
                <div className="flex justify-center mt-20 px-5">
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

                        <div className="flex flex-col items-center pb-10 pt-10">
                            {
                                user ? <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.photoURL} alt="Bonnie image" /> : ''
                            }
                            {
                                user ? <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.displayName}</h5> : ''
                            }
                            {
                                user ? <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span> : ''
                            }

                        </div>
                    </div>

                </div>
                <div className="mt-20 px-5">
                    <h3 className="text-2xl text-center md:text-4xl font-bold">Add a Tour Story</h3>
                    {/* Add tour Stroy */}


                    <form onSubmit={handleUserStory} className="max-w-sm mx-auto mt-16 mb-20">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user?.displayName} readOnly required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Photo</label>
                            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="spotName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Spot Name</label>
                            <input type="text" name="spotName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Spot Name" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description About the Tour</label>
                            <textarea name="description" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                        </div>
                        <div className="mb-5">
                            <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Experience</label>
                            <textarea name="experience" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <button type="submit" className="text-white md:w-full bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default UserProfile;