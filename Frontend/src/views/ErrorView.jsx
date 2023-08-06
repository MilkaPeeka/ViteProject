import mappings from "../mappings";
import { Link } from "react-router-dom/dist";
const ErrorView = () => {
    return <h1><Link to={mappings.devPath}>Error! Click me to go to the dev page</Link></h1>;
};

export default ErrorView;