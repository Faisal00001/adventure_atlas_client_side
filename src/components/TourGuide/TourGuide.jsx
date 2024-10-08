import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import useTourGuideInfo from "../../hooks/useTourGuideInfo";
import useTourPackages from "../../hooks/useTourPackages";
import GuideInfoCard from "../GuideInfoCard/GuideInfoCard";
import OurPackagesCard from "../OurPackagesCard/OurPackagesCard";

const TourGuide = () => {
    const tabTitles = ['overview', 'ourPackages', 'meetOurTourGuides']
    const { title } = useParams()
    let initialIndex = tabTitles.indexOf(title)
    if (initialIndex === -1) {
        initialIndex = 0
    }
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [tourPackages, packagesLoading] = useTourPackages()
    const [guideInfo, guideInfoLoading] = useTourGuideInfo()
    const navigate = useNavigate()

    const handleAllPackages = () => {
        navigate('/allPackages')
    }
    return (
        <div>
            <div className="container mx-auto my-24">
                <h3 className="text-2xl md:text-4xl text-center font-bold">Tourism and Travel Guide</h3>
                <Tabs className={'px-5'} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className={'flex justify-center mt-10 '}>
                        <Tab>
                            <Link to={`/${`overview`}`}>
                                Overview
                            </Link>
                        </Tab>
                        <Tab>
                            <Link to={`/${`ourPackages`}`}>
                                Our Packages
                            </Link>
                        </Tab>
                        <Tab>
                            <Link to={`/${`meetOurTourGuides`}`}>
                                Meet Our Tour Guides
                            </Link>
                        </Tab>
                    </TabList>
                    <TabPanel className={'border-t-2'}>
                        <div className="flex justify-center mt-10">
                            <div>
                                <iframe className="w-full md:w-[560px] lg:w-[800px] h-[315px] lg:h-[400px]" src="https://www.youtube.com/embed/ZSQxiozPXGU?si=GdDMTvlI3UNviZk_" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-5">
                            {
                                tourPackages.slice(0, 3).map(tourPackage => <OurPackagesCard packagesLoading={packagesLoading}
                                    tourPackage={tourPackage} key={tourPackage._id}></OurPackagesCard>)
                            }

                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleAllPackages} className="btn rounded-lg text-white bg-black hover:bg-black my-10"> All Packages</button>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-5">
                            {
                                guideInfo.map(guide => <GuideInfoCard guide={guide} guideInfoLoading={guideInfoLoading} key={guide._id}></GuideInfoCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TourGuide;