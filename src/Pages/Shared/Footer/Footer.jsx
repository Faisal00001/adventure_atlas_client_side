
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo.jpg";
const Footer = () => {
    return (
        <div>
            <footer className="footer mt-16 py-20 px-10 bg-black">
                <aside>
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={logo} alt="logo" />
                        </div>
                    </div>

                    <p className="text-white">
                        AdventureAtlas Ltd.<br />Providing reliable tech since 1992</p>
                </aside>
                <nav>
                    <header className="footer-title text-white">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebook className="text-2xl text-red-500"></FaFacebook>
                        <FaYoutube className="text-2xl text-red-500"></FaYoutube>
                        <FaTwitter className="text-2xl text-red-500"></FaTwitter>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;