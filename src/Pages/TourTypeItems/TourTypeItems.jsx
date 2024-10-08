import { useParams } from "react-router-dom";
import OurPackagesCard from "../../components/OurPackagesCard/OurPackagesCard";
import useTourPackages from "../../hooks/useTourPackages";


const TourTypeItems = () => {
    const { tourType } = useParams()
    const [tourPackages, packagesLoading] = useTourPackages()
    if (packagesLoading) {
        return "Loading"
    }
    // const [tourTypesItems, setTourTypesItems] = useState([])
    // useEffect( () => {
    //     const tourUnderTourTypes =  tourPackages.filter(tourPackage =>
    //         tourPackage.tourType === tourType)
    //     console.log(tourUnderTourTypes)
    // }, [tourPackages, tourType])
    const tourTypesItems = tourPackages.filter(tourPackage => tourPackage.tourType === tourType)
    return (
        <div>
            <div className="container mx-auto pt-20">
                <div className="my-20">
                    <h3 className="text-center md:text-4xl text-2xl font-bold">Packages of Tour Type : {tourType}</h3>
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-5">
                        {
                            tourTypesItems.map(tourPackage => <OurPackagesCard tourPackage={tourPackage} key={tourPackage._id}></OurPackagesCard>)
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TourTypeItems;