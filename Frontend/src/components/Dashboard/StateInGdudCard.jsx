/*
props: {
    gdud: number,
    summarizedRekemList (makat, valid, invalid),
    sx: JSON (optional)
}
*/

import { countRekemValidAndInvalid } from "../../helpers/DashboardHelpers";
import RekemDoughnut from "../Charts/RekemDoughnut";
import { Box, Typography } from "@mui/material";
const StateInGdudCard = (props) => {
    const rekemData = countRekemValidAndInvalid(props.summarizedRekemList);

    const boxSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingX: 8,
        paddingY: 3,
        boxShadow: 3,
        borderRadius: 10,
        bgcolor: "background.paper",
        ...props.sx
    }
    return (
    <Box sx={boxSX}>
        <Box padding={4}>
            <Typography variant="h3">המצב בגדוד</Typography>
            <Typography variant="h2" fontWeight="bold">{props.gdud}</Typography>
        </Box>
        <RekemDoughnut {...rekemData} height={250} width = {250}/>
    </Box>
    );

};


export default StateInGdudCard;