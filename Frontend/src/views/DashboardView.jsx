import { useEffect, useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import { Box, Paper } from "@mui/material";
import StateInGdudCard from "../components/Dashboard/StateInGdudCard";
import StateInGdudGraphCard from "../components/Dashboard/StateInGdudGraphCard";
import RekemsInGdudGroupCard from "../components/Dashboard/RekemsInGdudGroupCard";
import StateInZahalTableCard from "../components/Dashboard/StateInZahalTableCard";
import StatusCard from "../components/Dashboard/StatusCard";
import { countRekemValidAndInvalid, getBestValidInvalidRatioRekem, getWorstValidInvalidRatioRekem } from "../helpers/DashboardHelpers";
const DashboardView = () => {
    console.log("loaded dashboard");
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();

    // redirection
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
    }, [ctx.sessionData.isLoggedIn]);


    const RekemCardGroupProps = {
        summarizedRekemList: ctx.summarizedRekemList,
    };



    const stateInGdudGraphProps = {
        summarizedRekemList: ctx.summarizedRekemList,
        sx: {
            height: '100%',
            width: '100%'
        }
    };


    const {valid : validsInGdud, invalid: invalidsInGdud} = countRekemValidAndInvalid(ctx.summarizedRekemList);
    const toBarValueArray = (valid, invalid) => [valid,"תקינים מתוך", invalid];


    const worstRekem = getWorstValidInvalidRatioRekem(ctx.summarizedRekemList);
    const bestRekem = getBestValidInvalidRatioRekem(ctx.summarizedRekemList);
    

    const statusInGdudData = {
        barColor: 'primary',
        barValueArray: toBarValueArray(validsInGdud, invalidsInGdud),
        HeaderMainTitle: "המצב בגדוד",
        HeaderSubTitle: ctx.userData.gdud,
        CardMainTitle: (100 * validsInGdud / (validsInGdud + invalidsInGdud)).toFixed(0) + "%",
        CardSubTitle: "תקינות"
    };

    const worstRekemInGdudData = {
        barColor: 'error',
        barValueArray: toBarValueArray(worstRekem.valid, worstRekem.invalid),
        HeaderMainTitle: "מקט שדורש טיפול מיידי",
        HeaderSubTitle: worstRekem.makat,
        CardMainTitle: (100 * worstRekem.valid / (worstRekem.valid + worstRekem.invalid)).toFixed(0) + "%",
        CardSubTitle: "תקינות"
    };

    const bestRekemInGdudData = {
        barColor: 'success',
        barValueArray: toBarValueArray(bestRekem.valid, bestRekem.invalid),
        HeaderMainTitle: "מקט במצב תחזוקה הכי טוב",
        HeaderSubTitle: bestRekem.makat,
        CardMainTitle: (100 * bestRekem.valid / (bestRekem.valid + bestRekem.invalid)).toFixed(0) + "%",
        CardSubTitle: "תקינות"
    };


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

            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 2', gridRow: 'span 2'}}>
                <StatusCard {...worstRekemInGdudData}/>
            </Paper>
            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 2', gridRow: 'span 2'}}>
                <StatusCard {...bestRekemInGdudData}/>
            </Paper>
            <Paper sx={{bgcolor: "salmon", gridColumn: 'span 2', gridRow: 'span 2'}}>
                <StatusCard {...statusInGdudData}/>
            </Paper>

            <RekemsInGdudGroupCard {...RekemCardGroupProps} sx={{gridColumn: 'span 5', gridRow: ctx.userData.isManager ? 'span 5' : 'span 10'}}/>

            <StateInGdudGraphCard {...stateInGdudGraphProps} sx={{gridColumn: 'span 6', gridRow: 'span 8'}} />
            {ctx.userData.isManager && <Paper sx={{bgcolor: "salmon", gridColumn: 'span 5', gridRow: 'span 5'}}>
             <StateInZahalTableCard/>
            </Paper> }
        </Box>
    );
};

export default DashboardView;