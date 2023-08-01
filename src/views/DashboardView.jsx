import { useEffect, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import RekemCardGroup from "../components/Dashboard/RekemCardGroup";
import { Box } from "@mui/material";
import GdudCard from "../components/Dashboard/GdudCard";


const DashboardView = () => {
    const ctx = useContext(SiteContext);
    const [rekemList, setRekemList] = useState([]);

    const navigate = useNavigate();
    const loadRekems = () => {
        ctx.getRekemList()
        .then(result => setRekemList(result))
        .catch(err => console.log(err))
    };

    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);

        loadRekems();
        // console.log("useEffect Ran. it is normal to run twice with <React.StrictMode> ")
    }, [ctx.sessionData.isLoggedIn]);

    const props = {
        rekemList,
        width: 200,
        height: 250
    };
    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginY: 5,
        marginX: 20
    };

    return (
    <Box sx={boxSX}>
        <GdudCard sx={{marginBottom: 5}}/>
        <RekemCardGroup rekemList={rekemList}/>
    </Box>
    );
};

export default DashboardView;