import { useEffect, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import RekemCardGroup from "../components/Dashboard/RekemCardGroup";
import { Box } from "@mui/material";
import GdudSummaryCard from "../components/Dashboard/GdudSummaryCard";
import GdudSummaryGraphCard from "../components/Dashboard/GdudSummaryGraphCard";


const DashboardView = () => {
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();
    const rekemList = ctx.rekemList;
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);

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
        <GdudSummaryCard sx={{marginBottom: 5}} rekemList={rekemList} gdud={ctx.userData.gdud}/>
        <GdudSummaryGraphCard rekemList = {rekemList} sx={{marginBottom: 5}} graphHeight={"90vh"} />
        <RekemCardGroup {...props}/>
    </Box>
    );
};

export default DashboardView;