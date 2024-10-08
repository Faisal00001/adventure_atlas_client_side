import useAuth from "../../../hooks/useAuth";


const AdminProfile = () => {
    const { user } = useAuth()
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
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;