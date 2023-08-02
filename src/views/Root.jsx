import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom/dist";
import mappings from "../mappings";
const Root = () => {
    const navigate = useNavigate();
    useEffect(() => {
        return navigate(mappings.dashboardPath);
    }, []);
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Root;