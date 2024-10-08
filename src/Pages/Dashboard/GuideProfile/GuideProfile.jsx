import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const GuideProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const handleTourGuideProfile = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value
        const image = form.photo.value
        const experience = form.experience.value
        const language1 = form.language1.value
        const language2 = form.language2.value
        const language3 = form.language3.value
        const languages = [
            language1,
            language2,
            language3
        ]
        const specialties1 = form.specialties1.value
        const specialties2 = form.specialties2.value
        const specialties = [
            specialties1,
            specialties2
        ]
        const availability = form.availability.value
        const contactDetails = form.email.value
        const guideInfo = {
            name,
            experience,
            languages,
            specialties,
            rating: 1,
            availability,
            image,
            contactDetails
        }
        axiosSecure.post('/tourGuideInfo', guideInfo)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} Guide Profile Added`,


                    });
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div>
            <div className="mt-20">
                <div className="text-center">
                    <h3 className="font-bold text-2xl md:text-4xl">Welcome Back {user ? user.displayName : ''}</h3>
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
                        <h3 className="text-2xl text-center md:text-4xl font-bold">Add Tour Guide Profile</h3>
                        {/* Add tour Stroy */}


                        <form onSubmit={handleTourGuideProfile} className="max-w-sm mx-auto mt-16 mb-20">
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user?.displayName} readOnly required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Photo</label>
                                <input type="text" name="photo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user?.photoURL} required />

                            </div>
                            <div className="mb-5">
                                <label htmlFor="spotName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Experience</label>
                                <input type="text" name="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Experience in years" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Add Languages your know</label>
                                <input type="text" name="language1" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Language" />
                                <input type="text" name="language2" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Language" />
                                <input type="text" name="language3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Language" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Add Skills</label>
                                <input type="text" name="specialties1" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Specialties" />
                                <input type="text" name="specialties2" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Specialties" />

                            </div>
                            <div className="mb-5">
                                <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Availability</label>
                                <input type="text" name="availability" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Availability" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contact </label>
                                <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required defaultValue={user?.email} readOnly />
                            </div>

                            <button type="submit" className="text-white md:w-full bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default GuideProfile;