import { useEffect, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import RekemCardGroup from "../components/Dashboard/RekemCardGroup";
import { Box } from "@mui/material";
import GdudSummaryCard from "../components/Dashboard/GdudSummaryCard";
import GdudSummaryGraphCard from "../components/Dashboard/GdudSummaryGraphCard";
import GeneralRekemStateCard from "../components/Dashboard/GeneralRekemStateCard";


const DashboardView = () => {
    console.log("loaded dashboard");
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();

    // redirection
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
    }, [ctx.sessionData.isLoggedIn]);


    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginY: 5,
        marginX: 20
    };

    const RekemCardGroupProps = {
        rekemList: ctx.rekemList,
        width: 200,
        height: 250
    };

    const GeneralRekemStateProps = {
        sx: {marginTop: 5},
    };

    return (
    <Box sx={boxSX}>
        <GdudSummaryCard sx={{marginBottom: 5}} rekemList={ctx.rekemList} gdud={ctx.userData.gdud}/>
        <GdudSummaryGraphCard rekemList = {ctx.rekemList} sx={{marginBottom: 5}} graphHeight={"90vh"} />
        <RekemCardGroup {...RekemCardGroupProps}/>
        {ctx.userData.isManager && <GeneralRekemStateCard {...GeneralRekemStateProps} />}
    </Box>
    );
};

export default DashboardView;