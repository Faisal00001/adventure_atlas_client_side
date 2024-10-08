import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBookings from "../../../hooks/useBookings";

import Confetti from 'react-confetti';
const UserBookings = () => {
    const [bookings, , refetch] = useBookings()
    const [discount, setDiscount] = useState(false)
    const axiosSecure = useAxiosSecure()
    const [isConfettiActive, setConfettiActive] = useState(true);

    useEffect(() => {
        if (bookings.length > 3) {
            setDiscount(true)
        }
        else {
            setDiscount(false)
        }
    }, [bookings])
    useEffect(() => {
        const timer = setTimeout(() => {

            setConfettiActive(false);
        }, 20000);
        return () => clearTimeout(timer);
    }, [])
    const handleCancel = (booking) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('j')
                axiosSecure.delete(`/bookingDelete/${booking._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error.message)
                    })

            }
        });
    }
    const handlePay = () => {
        Swal.fire({
            icon: "success",
            title: "Thank You",
            text: "Payment Done",
            showConfirmButton: false,
            timer: 1500
        });
    }
    const handleDisocunt = () => {
        Swal.fire({
            icon: "success",
            title: "Thank You",
            text: "Discount Added Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <div>
            {
                discount && isConfettiActive && <Confetti

                ></Confetti>
            }
            <div className="mt-20">
                <h3 className="text-center font-bold text-2xl md:text-4xl">Total Bookings : {bookings.length}</h3>
                <div className="flex justify-center px-2 mt-20">
                    <div className="overflow-x-auto w-full ">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Package</th>
                                    <th>Tour Guide</th>
                                    <th>Tour Date</th>
                                    <th>Tour Price</th>
                                    <th>Status</th>
                                    <th>Pay</th>
                                    <th>Cancel</th>
                                    <th>Apply</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    bookings.map((booking, index) => <tr key={booking._id}>
                                        <th>{index + 1}</th>
                                        <td>{booking.packageName}</td>
                                        <td>{booking.tourGuideName}</td>
                                        <td>{booking.tourDate.slice(0, 10)}</td>
                                        <td>{booking.price}</td>
                                        <td className="whitespace-nowrap">
                                            {booking.status}
                                        </td>{
                                            booking.status === 'Rejected' ? '' : <><td>{
                                                booking.status === 'Accepted' ? <button onClick={handlePay} className="btn bg-green-500 hover:bg-green-500 rounded-md text-white">Pay</button> : ''
                                            } </td>
                                                <td>{
                                                    booking.status === 'In Review' ? <button onClick={() => handleCancel(booking)} className="btn bg-red-500 hover:bg-red-500 text-white rounded-md">Cancel</button> : ''
                                                }</td>
                                                <td>{discount ? <button onClick={handleDisocunt} className="btn bg-pink-500 hover:bg-pink-500 text-white rounded-md">Apply</button> : ''}</td></>}
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

export default UserBookings;