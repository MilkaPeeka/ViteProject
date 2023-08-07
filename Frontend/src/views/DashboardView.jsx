import { useEffect } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import { Box } from "@mui/material";
import StateInGdudCard from "../components/Dashboard/StateInGdudCard";
import StateInGdudGraphCard from "../components/Dashboard/StateInGdudGraphCard";
import RekemsInGdudGroupCard from "../components/Dashboard/RekemsInGdudGroupCard";
import StateInZahalTableCard from "../components/Dashboard/StateInZahalTableCard";


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
        summarizedRekemList: ctx.summarizedRekemList,
        width: 200,
        height: 250
    };

    const GeneralRekemStateProps = {
        sx: {marginTop: 5},
    };

    const stateInGdudCardProps = {
        sx: {marginBottom: 5},
        summarizedRekemList: ctx.summarizedRekemList,
        gdud: ctx.userData.gdud
    };

    const stateInGdudGraphProps = {
        summarizedRekemList: ctx.summarizedRekemList,
        sx: {marginBottom: 5},
        graphHeight: "90vh" 
    };

    return (
    <Box sx={boxSX}>
        <StateInGdudCard {...stateInGdudCardProps}/>
        <StateInGdudGraphCard {...stateInGdudGraphProps} />
        <RekemsInGdudGroupCard {...RekemCardGroupProps}/>
        {ctx.userData.isManager && <StateInZahalTableCard {...GeneralRekemStateProps} />}
    </Box>
    );
};

export default DashboardView;