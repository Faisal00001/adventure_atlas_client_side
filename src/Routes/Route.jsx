import {
    createBrowserRouter
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AllPackages from "../Pages/AllPackages/AllPackages";
import Blogs from "../Pages/Blogs/Blogs";
import Community from "../Pages/Community/Community";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AddPackage from "../Pages/Dashboard/AddPackage/AddPackage";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import GuideProfile from "../Pages/Dashboard/GuideProfile/GuideProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MyWishList from "../Pages/Dashboard/MyWishList/MyWishList";
import TourGuideAssignedTour from "../Pages/Dashboard/TourGuideAssignedTour/TourGuideAssignedTour";
import UserBookings from "../Pages/Dashboard/UserBookings/UserBookings";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import Register from "../Pages/Register/Register";
import TourGuideProfile from "../Pages/TourGuideProfile/TourGuideProfile";
import TourTypeItems from "../Pages/TourTypeItems/TourTypeItems";
import TouristAllStories from "../Pages/TouristAllStories/TouristAllStories";
import TouristStoryDetails from "../Pages/TouristStoryDetails/TouristStoryDetails";
import UserProfile from "../Pages/UserProfile/UserProfile";
import TourType from "../components/TourType/TourType";
import TouristStory from "../components/TouristStory/TouristStory";
import AdminRoute from "./AdminRoute";
import GuideRoute from "./GuideRoute";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/community',
                element: <Community></Community>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contactUs',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/:title',
                element: <Home></Home>
            },
            {
                path: '/packageDetails/:id',
                element: <PackageDetails></PackageDetails>
            },
            {
                path: '/allPackages',
                element: <AllPackages></AllPackages>

            },
            {
                path: '/tourGuideProfile/:id',
                element: <TourGuideProfile></TourGuideProfile>
            },
            {
                path: '/tourType',
                element: <TourType></TourType>
            },
            {
                path: '/TourTypeItems/:tourType',
                element: <TourTypeItems></TourTypeItems>
            },
            {
                path: '/touristStory',
                element: <TouristStory></TouristStory>
            },
            {
                path: '/touristStory/:id',
                element: <TouristStoryDetails></TouristStoryDetails>
            },
            {
                path: '/touristAllStories',
                element: <TouristAllStories></TouristAllStories>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'myWishList',
                element: <MyWishList></MyWishList>
            },
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>

            },
            {
                path: 'userBookings',
                element: <UserBookings></UserBookings>
            },
            // Tour Guide Route
            {
                path: 'guideProfile',
                element: <GuideRoute><GuideProfile></GuideProfile></GuideRoute>
            },
            {
                path: 'tourGuideAssignedTour',
                element: <GuideRoute><TourGuideAssignedTour></TourGuideAssignedTour></GuideRoute>
            },
            // Admin Route
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'addPackages',
                element: <AdminRoute><AddPackage></AddPackage></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },



        ]
    }
]);
export default router