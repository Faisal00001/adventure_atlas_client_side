import Swal from "sweetalert2";
import useAssignedTour from "../../../hooks/useAssignedTour";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TourGuideAssignedTour = () => {
    const axiosSecure = useAxiosSecure()
    const [assignedTours, , refetch] = useAssignedTour()
    const handleAccept = (assignedTour) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/makeTourAccept/${assignedTour._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire("Saved!", "", "success");
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
    const handleReject = (assignedTour) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/makeTourReject/${assignedTour._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire("Saved!", "", "success");
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
            <div className="mt-20">
                <div>
                    <h3 className="text-center text-2xl md:text-4xl font-bold">My Assigned Tour : {assignedTours.length}</h3>
                </div>
                <div className="mt-20">
                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Package</th>
                                    <th>Tourist Name</th>
                                    <th>Tour Date</th>
                                    <th>Tour Price</th>
                                    <th>Accept</th>
                                    <th>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    assignedTours.map((assignedTour, index) => <tr key={assignedTour._id}>
                                        <th>{index + 1}</th>
                                        <td>{assignedTour.packageName}</td>
                                        <td>{assignedTour.touristName}</td>
                                        <td>{assignedTour.tourDate.slice(0, 10)}</td>
                                        <td>{assignedTour.price}</td>
                                        {
                                            assignedTour.status === 'Rejected' ? <td className="flex items-center">

                                                <button onClick={() => handleAccept(assignedTour)} className="btn bg-green-500  hover:bg-green-500 text-white rounded-md">Accept</button>
                                                <p className="pl-10">Tour Rejected</p>
                                            </td> : assignedTour.status === 'Accepted' ? <td className="flex items-center">
                                                <p className="pr-10">Tour Accepted</p>
                                                <button onClick={() => handleReject(assignedTour)} className="btn bg-red-500 hover:bg-red-500 text-white rounded-md">Reject</button>
                                            </td> : <>
                                                <td>
                                                    <button onClick={() => handleAccept(assignedTour)} className="btn bg-green-500 hover:bg-green-500 text-white rounded-md">Accept</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleReject(assignedTour)} className="btn bg-red-500 hover:bg-red-500 text-white rounded-md">Reject</button>
                                                </td></>
                                        }

                                    </tr>)
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideAssignedTour;