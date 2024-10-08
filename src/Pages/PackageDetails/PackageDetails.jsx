import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageGallery from "react-image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { AuthContext } from "../../Provider/AuthProvider";
import GuideInfoCard from "../../components/GuideInfoCard/GuideInfoCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTourGuideInfo from "../../hooks/useTourGuideInfo";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const PackageDetails = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const { user } = useContext(AuthContext)
    const [guideInfo, guideInfoLoading] = useTourGuideInfo()
    const { id } = useParams()
    const { data: packageDetails = [], isPending: packageDetailsLoading } = useQuery({
        queryKey: ['packageDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tourPackages/${id}`);
            return res.data;
        }
    })

    if (packageDetailsLoading) {
        return "Loading"
    }
    if (guideInfoLoading) {
        return "Loading"
    }
    const images = []
    for (const item of packageDetails.gallery) {
        let obj = {
            original: item,
            thumbnail: item
        }
        images.push(obj)
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
    };
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'default') {
            setSelectedGuide(null);
        } else {
            const selectedGuideObject = JSON.parse(selectedValue);
            setSelectedGuide(selectedGuideObject);
        }
    }
    console.log(selectedGuide)
    const handleBooking = (event) => {
        event.preventDefault()

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const form = event.target
                const touristName = form.touristName.value
                const touristEmail = form.touristEmail.value
                const price = form.price.value
                const tourDate = startDate
                const tourGuideName = selectedGuide.name
                const imageFile = { image: selectedImageFile }
                const packageName = packageDetails.tripTitle
                axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        if (res.data.success) {
                            const booking = {
                                touristName,
                                touristEmail,
                                touristImage: res.data.data.display_url,
                                price,
                                tourDate,
                                tourGuideName,
                                packageName,
                                status: 'In Review',
                                guideInfoId: selectedGuide._id,
                                guideInfoEmail: selectedGuide.contactDetails

                            }
                            axiosSecure.post('/bookings', booking)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        form.reset()
                                        Swal.fire("Saved!", "", "success");
                                        navigate(`/dashboard/userBookings`)
                                    }
                                })

                        }
                    })
                    .catch(error => {
                        console.log(error.message)
                    })


            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });



    }
    return (
        <div>
            <div className="pt-20 container mx-auto">

                {/* Modal End */}
                <h3 className="text-center text-2xl md:text-4xl font-bold mt-24 mb-10">Places we will Visit</h3>
                <div className="px-5 md:w-[80%] mx-auto">
                    <ImageGallery items={images}
                        thumbnailPosition={'left'} />
                </div>
                <div className="mt-10 mb-24">
                    <h3 className="text-2xl md:text-4xl font-bold text-center my-20">About the Tour</h3>
                    <p className="bg-base-200 my-10 mx-auto w-[80%] py-10 text-center px-10 text-slate-800">{packageDetails.aboutTheTour}</p>

                    <h3 className="text-2xl md:text-4xl font-bold text-center my-20">Tour Plan</h3>
                    <section className="dark:bg-gray-800 dark:text-gray-100 px-5">
                        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                            <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700 ">
                                {
                                    packageDetails.tourPlan.map((tour, index) => <details key={index} open="">
                                        <summary className="py-2 outline-none cursor-pointer focus:underline">Day{index + 1}  <span className="ml-10 text-center font-semibold"><span>{tour.activity}</span></span></summary>
                                        <div className="px-4 pb-4">
                                            <p>{tour.description}</p>
                                        </div>
                                    </details>)
                                }



                            </div>
                        </div>
                    </section>
                    <div className="my-20">
                        <h3 className="text-center text-2xl md:text-4xl font-bold px-5">Our Tour Guides</h3>
                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-5">
                            {
                                guideInfo.map(guide => <GuideInfoCard guide={guide} guideInfoLoading={guideInfoLoading} key={guide._id}></GuideInfoCard>)
                            }
                        </div>
                    </div>
                    <div className="my-24">
                        <h3 className="text-2xl md:text-4xl text-center font-bold ">Booking</h3>
                    </div>
                    {/* Form section */}
                    <section className="px-5">



                        <form onSubmit={handleBooking} className="max-w-sm mx-auto">
                            <div className="mb-5">
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Name</label>
                                <input type="text" name="touristName" id="touristName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" defaultValue={`${user ? user.displayName : ''}`} readOnly required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Email </label>
                                <input type="email" name="touristEmail" id="TouristEmail" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required defaultValue={`${user ? user.email : ''}`} readOnly />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Photo</label>
                                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="text" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required defaultValue={packageDetails.price} readOnly />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="Date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tour Date</label>
                                <DatePicker
                                    showIcon
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}

                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="guideName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tour Guide Name</label>

                                <select defaultValue="default" onChange={handleSelectChange} className="select rounded-lg select-bordered w-full ">
                                    <option disabled value="default">Select your Tour Guide</option>
                                    {
                                        guideInfo.map((guide, index) => <option key={index} value={JSON.stringify(guide)}>{guide.name}</option>)
                                    }
                                </select>



                            </div>
                            {
                                user ? <button type="submit" className="text-white w-full bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Now</button> : <button type="submit" disabled className="text-white w-full bg-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Now</button>
                            }


                        </form>

                    </section>

                    {/* <h3 className="text-2xl font-bold mb-10 px-2 md:text-4xl text-center">Detail Information for the {packageDetails.
                        tripTitle} Package</h3>
                    <div>
                        <div className="card w-[80%] mx-auto card-compact bg-base-100 shadow-xl">
                            <figure><img src={packageDetails.image || ''} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{packageDetails.tourType || ''}</h2>
                                <h2 className="card-title">{packageDetails.
                                    tripTitle || ''}</h2>
                                <p className='text-base font-semibold'>Price : ${packageDetails.price || ''}</p>
                                <p className='text-base text-slate-700'>{packageDetails.packageDetails || ''}</p>

                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
        </div>

    );
};

export default PackageDetails;