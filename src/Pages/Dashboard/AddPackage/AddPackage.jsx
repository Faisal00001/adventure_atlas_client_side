import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPackage = () => {
    const axiosSecure = useAxiosSecure()
    const handlePackage = (event) => {
        event.preventDefault()
        const form = event.target
        const image = form.packageImage.value
        const tourType = form.tourType.value
        const tripTitle = form.tripTitle.value
        const price = form.price.value
        const packageDetails = form.packageDetails.value
        const gallery1 = form.gallery1.value
        const gallery2 = form.gallery2.value
        const gallery3 = form.gallery3.value
        const gallery4 = form.gallery4.value
        const gallery5 = form.gallery5.value
        const gallery = [
            gallery1,
            gallery2,
            gallery3,
            gallery4,
            gallery5
        ]
        const aboutTheTour = form.aboutTheTour.value
        const tourPlan = [
            {
                day: parseFloat(form.day1.value),
                activity: form.activity1.value,
                description: form.description1.value
            },
            {
                day: parseFloat(form.day2.value),
                activity: form.activity1.value,
                description: form.description1.value
            },
            {
                day: parseFloat(form.day2.value),
                activity: form.activity1.value,
                description: form.description1.value
            }

        ]
        const packageInformation = {
            image,
            tourType,
            tripTitle,
            price,
            packageDetails,
            gallery,
            aboutTheTour,
            tourPlan
        }
        axiosSecure.post(`/addPackage`, packageInformation)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Great...",
                        text: "Package Added Successfully",
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
                <h3 className="text-2xl md:text-4xl text-center font-bold">Add a Package</h3>

                <div className="mt-16 mb-20 px-3">
                    <form onSubmit={handlePackage} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Package Image</label>
                            <input type="text" name="packageImage" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />

                        </div>
                        <div className="mb-5">
                            <label htmlFor="tourType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Tour Type </label>
                            <input type="text" name="tourType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Tour Type" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="tripTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Trip Title</label>
                            <input type="text" name="tripTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Trip Title" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="text" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="packageDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Package Details Information</label>
                            <textarea name="packageDetails" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="photoURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Images URL For Gallery</label>
                            <input type="text" name="gallery1" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />
                            <input type="text" name="gallery2" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />
                            <input type="text" name="gallery3" className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />
                            <input type="text" name="gallery4" className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />
                            <input type="text" name="gallery5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo URL" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="aboutTheTour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About the Tour</label>
                            <textarea name="aboutTheTour" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                        </div>
                        <div className="mb-5">
                            <label htmlFor="tourPlan" className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Tour Plan</label>
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Day</label>
                            <input type="text" name="day1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={1} required />
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity</label>
                            <textarea name="activity1" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description1" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <label htmlFor="tourPlan" className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Second Day</label>
                            <input type="text" name="day2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={2} required />
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity</label>
                            <textarea name="activity2" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description2" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <label htmlFor="tourPlan" className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Third Day</label>
                            <input type="text" name="day3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={3} required />
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity</label>
                            <textarea name="activity3" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <label htmlFor="tourPlan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description3" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>


            </div>

        </div>
    );
};

export default AddPackage;