
import { useContext } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import logo from "../../../assets/logo.jpg";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error.message)
            })
    }
    const navLinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-red-500" : "text-white font-medium"
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/community"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-red-500" : "text-white font-medium"
                }
            >
                Community
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blogs"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-red-500" : "text-white  font-medium"
                }
            >
                Blogs
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/aboutUs"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-red-500" : "text-white  font-medium"
                }
            >
                About Us
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/contactUs"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-red-500" : "text-white  font-medium"
                }
            >
                Contact Us
            </NavLink>
        </li>
        <li>
            {
                user ? <>
                    <button onClick={handleLogOut} className="text-white">LogOut</button>
                </> : <><NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-red-500" : "text-white  font-medium"
                    }
                >
                    Login
                </NavLink></>
            }

        </li>

    </>
    return (
        <div>
            <nav className="navbar fixed z-50 bg-black opacity-80">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <IoMenuSharp className="text-3xl text-white"></IoMenuSharp>
                        </label>
                        <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/community"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                    }
                                >
                                    Community
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/blogs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                    }
                                >
                                    Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/aboutUs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contactUs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                {
                                    user ? <>
                                        <button onClick={handleLogOut} className="text-black">LogOut</button>
                                    </> : <><NavLink
                                        to="/login"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-red-500" : "text-black  font-medium"
                                        }
                                    >
                                        Login
                                    </NavLink></>
                                }
                            </li>

                        </ul>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>

                        <a className="text-lg text-white font-bold md:text-2xl">AdventureAtlas</a>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end pr-2">
                    {
                        user ? <div className="dropdown dropdown-end">
                            {/* <label tabIndex={0} className="btn rounded-lg m-1">Click</label> */}
                            <div tabIndex={0} className="avatar online placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-11">
                                    <img src={user.photoURL} alt="" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content  z-[1] menu p-2 bg-white rounded-box">
                                <li className="text-slate-800 pointer-events-none font-semibold pl-4 py-2">
                                    {
                                        user.displayName
                                    }
                                </li>
                                <li className="text-slate-800 pointer-events-none font-semibold pl-4  py-2">
                                    {
                                        user.email
                                    }
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : "text-black  font-medium"
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>

                                {
                                    user.email ? <button onClick={handleLogOut} className="btn text-white hover:bg-black bg-black">
                                        LogOut
                                    </button> : <Link to={'/login'} className="btn text-white hover:bg-black bg-black">
                                        Login
                                    </Link>
                                }

                            </ul>
                        </div> : ''
                    }

                </div>
            </nav>
        </div>
    );
};

export default Navbar;