

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/bgmgPVN/ammie-ngo-vcu-OZBxx-Rk-unsplash.jpg)' }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center ">
                    <div className="max-w-md">
                        <h1 className="mb-5 mt-16 text-3xl text-white md:text-5xl font-bold">Welcome to Paradise</h1>
                        <p className="mb-5 text-white  text-lg">Find the Best Trips Within Your Budget</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;