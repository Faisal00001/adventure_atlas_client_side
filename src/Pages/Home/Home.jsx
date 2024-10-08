import Banner from "../../components/Banner/Banner";
import TourGuide from "../../components/TourGuide/TourGuide";
import TourType from "../../components/TourType/TourType";
import TouristStory from "../../components/TouristStory/TouristStory";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TourGuide></TourGuide>
            <TourType></TourType>
            <TouristStory></TouristStory>
        </div>
    );
};

export default Home;