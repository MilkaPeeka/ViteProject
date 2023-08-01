import mappings from "../mappings";
import { Link } from "react-router-dom/dist";
const ErrorView = () => {
    return <h1><Link to={mappings.dashboardPath}>Error! Click me to go to the main page</Link></h1>;
};

export default ErrorView;