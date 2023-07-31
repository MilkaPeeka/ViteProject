import { useEffect } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
const DashboardView = () => {
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate('/' + mappings.signInPath);

    }, [ctx.sessionData.isLoggedIn]);
    
    return <h1>dashboard view</h1>
};

export default DashboardView;