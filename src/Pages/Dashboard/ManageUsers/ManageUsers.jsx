import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";
const ManageUsers = () => {
    const [users, usersLoading, refetch] = useUsers()
    const axiosSecure = useAxiosSecure()
    if (usersLoading) {
        return "Loading"
    }
    const handleDeleteUser = (user) => {
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `User ${user.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is Now Admin`,
                    });
                    refetch()
                }
            })
    }
    const handleMakeTourGuide = (user) => {
        axiosSecure.patch(`/users/makeTourGuide/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is Now Tour Guide`,
                    });
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className="flex flex-col md:mb-10 md:flex-row gap-5 justify-evenly mt-20">
                <div>
                    <h3 className="text-center md:mb-0 mb-5 text-2xl md:text-4xl font-bold">Manage Users</h3>
                </div>

                <div>
                    <h3 className="text-center md:mb-0 mb-20 text-2xl md:text-4xl font-bold">Total Users {users.length}</h3>
                </div>
            </div>
            <div className="overflow-x-auto mb-20">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' || user.role === 'tourGuide' ? `${user.role}` : <>
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-active mb-2">Make Admin</button>
                                            <button onClick={() => handleMakeTourGuide(user)} className="btn btn-active btn-neutral ml-2">Make Tour Guide</button>
                                        </>
                                    }

                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)}>
                                        <MdDelete className="text-2xl text-red-500"></MdDelete>
                                    </button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;