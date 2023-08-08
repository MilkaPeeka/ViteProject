import { useEffect, useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import { Box } from "@mui/material";

import StateInGdudGraphCard from "../components/Dashboard/StateInGdudGraphCard";
import RekemsInGdudGroupCard from "../components/Dashboard/RekemsInGdudGroupCard";
import StateInZahalTableCard from "../components/Dashboard/StateInZahalTableCard";
import StatusCard from "../components/Dashboard/StatusCard";
import { countRekemValidAndInvalid, getBestValidInvalidRatioRekem, getWorstValidInvalidRatioRekem } from "../helpers/DashboardHelpers";

const DashboardView = () => {
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();

    // redirection
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
    }, [ctx.sessionData.isLoggedIn]);

    const {valid : validsInGdud, invalid: invalidsInGdud} = countRekemValidAndInvalid(ctx.summarizedRekemList);

    const toBarValueArray = (valid, invalid) => [valid,"תקינים מתוך", invalid + valid];
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
        HeaderMainTitle: "מקט הדורש טיפול מיידי",
        HeaderSubTitle: worstRekem.makat,
        CardMainTitle: (100 * worstRekem.valid / (worstRekem.valid + worstRekem.invalid)).toFixed(0) + "%",
        CardSubTitle: "תקינות"
    };

    const bestRekemInGdudData = {
        barColor: 'success',
        barValueArray: toBarValueArray(bestRekem.valid, bestRekem.invalid),
        HeaderMainTitle: "המקט המתוחזק ביותר",
        HeaderSubTitle: bestRekem.makat,
        CardMainTitle: (100 * bestRekem.valid / (bestRekem.valid + bestRekem.invalid)).toFixed(0) + "%",
        CardSubTitle: "תקינות"
    };


    const boxSX = {
        display: 'grid',
        gridTemplateRows: 'repeat(10, 1fr)',
        gridTemplateColumns: 'repeat(11, 1fr)',
        gap: 3,
        padding: 5,
        height: '95vh',
    };
    return (
        <Box sx={boxSX}>
            <StatusCard {...statusInGdudData} sx={{gridColumn: 'span 2', gridRow: 'span 2'}}/>
            <StatusCard {...bestRekemInGdudData} sx={{gridColumn: 'span 2', gridRow: 'span 2'}}/>
            <StatusCard {...worstRekemInGdudData} sx={{gridColumn: 'span 2', gridRow: 'span 2'}}/>
            <RekemsInGdudGroupCard summarizedRekemList = {ctx.summarizedRekemList} sx={{gridColumn: 'span 5', gridRow: ctx.userData.isManager ? 'span 5' : 'span 10'}}/>
            <StateInGdudGraphCard summarizedRekemList = {ctx.summarizedRekemList} sx={{gridColumn: 'span 6', gridRow: 'span 8'}} />
            {ctx.userData.isManager && <StateInZahalTableCard sx={{gridColumn: 'span 5', gridRow: 'span 5'}}/>}
        </Box>
    );
};

export default DashboardView;