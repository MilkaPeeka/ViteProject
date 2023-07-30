import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
const Root = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Root;