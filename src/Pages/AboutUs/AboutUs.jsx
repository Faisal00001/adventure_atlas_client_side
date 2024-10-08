

const AboutUs = () => {
    return (
        <div>
            <div className="pt-24">
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto flex flex-col md:flex-row items-center px-5">

                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <img
                                src="https://i.ibb.co/G3ZF9YM/brooke-cagle-u-HVRv-Dr7pg-unsplash.jpg"
                                alt="Team at Adventure Explorers"
                                className="rounded-lg shadow-md"
                            />
                        </div>


                        <div className="md:w-1/2 md:ml-8">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>
                            <p className="text-gray-600 mb-8">
                                Welcome to AdventureAtlas, where a passionate team of adventurers has come together to share the joy of exploration. Our mission is to provide you with the tools and inspiration to embark on unforgettable journeys around the world.
                            </p>
                            <p className="text-gray-600">
                                At AdventureAtlas, we believe that every destination has a story to tell, and every traveler is a storyteller. Join us as we navigate the globe, uncover hidden gems, and create a community of explorers who seek the thrill of discovery.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default AboutUs;