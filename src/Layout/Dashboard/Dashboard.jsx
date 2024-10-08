import { CiViewList } from "react-icons/ci";
import { FaCalendarCheck, FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useGuide from "../../hooks/useGuide";
const Dashboard = () => {
    // TODO:Admin value from database
    const [isAdmin] = useAdmin();
    const [isTourGuide] = useGuide();
    return (
        <div>
            <div className="drawer lg:drawer-open relative">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                </div>
                <label htmlFor="my-drawer-2" className="btn absolute  top-0 left-0 bg-black rounded-none drawer-button lg:hidden w-full">
                    <IoMdMenu className="text-3xl text-red-500" />
                </label>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin ? <>
                                <h3 className="text-center text-red-500 font-bold text-base">Admin</h3>
                                <ul className="menu">
                                    <li>
                                        <NavLink to={`/dashboard/adminProfile`}>
                                            <FaHome className="text-3xl text-red-500"></FaHome>My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/dashboard/addPackages`}>
                                            <MdPostAdd className="text-3xl text-red-500"></MdPostAdd>Add Package</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to={`/dashboard/manageUsers`}>
                                            <HiAdjustmentsHorizontal className="text-3xl text-red-500"></HiAdjustmentsHorizontal> Manage Users</NavLink>

                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to={`/`}>
                                            <FaHome className="text-3xl text-red-500"></FaHome>Home</NavLink>
                                    </li>

                                </ul>
                            </> : isTourGuide ? <> <h3 className="text-center text-red-500 font-bold text-base">Tour Guide</h3>
                                <ul className="menu">

                                    <li>
                                        <NavLink to={`/dashboard/guideProfile`}>
                                            <FaHome className="text-3xl text-red-500"></FaHome>Tour Guide Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/dashboard/tourGuideAssignedTour`}>
                                            <HiAdjustmentsHorizontal className="text-3xl text-red-500"></HiAdjustmentsHorizontal>My Assigned Tours</NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to={`/`}>
                                            <FaHome className="text-3xl text-red-500"></FaHome>Home</NavLink>
                                    </li>
                                </ul></> : <> <h3 className="text-center text-red-500 font-bold text-base">User</h3>
                                <ul className="menu">

                                    <li>
                                        <NavLink to={`/dashboard/userProfile`}>
                                            <FaCircleUser className="text-3xl text-red-500"></FaCircleUser> My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/dashboard/userBookings`}>
                                            <FaCalendarCheck className="text-3xl text-red-500"></FaCalendarCheck>My Bookings</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to={`/dashboard/myWishList`}>
                                            <CiViewList className="text-3xl text-red-500"></CiViewList> My Wishlist</NavLink>

                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to={`/`}>
                                            <FaHome className="text-3xl text-red-500"></FaHome>Home</NavLink>
                                    </li>

                                </ul></>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;