import OurPackagesCard from "../../components/OurPackagesCard/OurPackagesCard";
import useTourPackages from "../../hooks/useTourPackages";


const AllPackages = () => {
    const [tourPackages, packagesLoading] = useTourPackages()
    if (packagesLoading) {
        return "Loading"
    }
    return (
        <div>
            <div className="container mx-auto pt-20">
                <div className="my-24">
                    <h3 className="text-2xl md:text-4xl text-center font-bold">All Packages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        tourPackages.map(tourPackage => <OurPackagesCard key={tourPackage._id} tourPackage={tourPackage}></OurPackagesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllPackages;