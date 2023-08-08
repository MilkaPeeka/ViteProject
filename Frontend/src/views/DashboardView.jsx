import { useEffect } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import { Box, LinearProgress, Paper, makeStyles } from "@mui/material";
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
    };



    const stateInGdudCardProps = {
        summarizedRekemList: ctx.summarizedRekemList,
        gdud: ctx.userData.gdud
    };

    const stateInGdudGraphProps = {
        summarizedRekemList: ctx.summarizedRekemList,
        sx: {
            height: '100%',
            width: '100%'
        }
    };

    // return (
    // <Box sx={boxSX}>
    // </Box>
    
    return (
        
        <Box sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(10, 1fr)',
            gridTemplateColumns: 'repeat(11, 1fr)',
            gap: 3,
            padding: 5,
            height: '95vh',
            backgroundImage:'background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
            WebkitAnimation: 'Gradient 15s ease infinite',
            MozAnimation: 'Gradient 15s ease infinite',
            animation:'Gradient 15s ease infinite',
          }}>

            <StateInGdudCard {...stateInGdudCardProps} sx={{gridColumn: 'span 2', gridRow: 'span 2'}}/>

            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 2', gridRow: 'span 2'}}>
                רקם הכי מוצלח
            </Paper>
            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 2', gridRow: 'span 2'}}>
                רקם הכי פחות מוצלח
                <LinearProgress variant="buffer" value={90} />
            </Paper>

            <RekemsInGdudGroupCard {...RekemCardGroupProps} sx={{gridColumn: 'span 5', gridRow: 'span 5'}}/>

            <StateInGdudGraphCard {...stateInGdudGraphProps} sx={{gridColumn: 'span 6', gridRow: 'span 8'}} />
            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 5', gridRow: 'span 5'}}>
            {ctx.userData.isManager && <StateInZahalTableCard/>}
            </Paper>
        </Box>
    );
};

export default DashboardView;