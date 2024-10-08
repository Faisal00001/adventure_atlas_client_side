

const ContactUs = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <div>
            <div className="pt-20">
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact AdventureAtlas</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions or want to get in touch? Reach out to AdventureAtlas using the contact information below or fill out the form, and we will get back to you as soon as possible.
                        </p>


                        <div className="flex justify-center items-center mb-8">
                            <div className="mr-4">
                                <i className="fas fa-envelope text-blue-500 text-2xl"></i>
                            </div>
                            <div>
                                <p className="text-gray-700">Email: <span className="font-semibold">info@adventureatlas.com</span></p>
                            </div>
                        </div>


                        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 btn px-5 hover:bg-blue-700 text-white font-bold py-2  rounded-md focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default ContactUs;