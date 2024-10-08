import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGuide from "../hooks/useGuide";
const GuideRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTourGuide, isTourGuideLoading] = useGuide();
    const location = useLocation();

    if (loading || isTourGuideLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isTourGuide) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};
GuideRoute.propTypes = {
    children: PropTypes.node.isRequired
}
export default GuideRoute;