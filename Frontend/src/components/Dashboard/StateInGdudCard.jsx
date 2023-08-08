/*
props: {
    gdud: number,
    summarizedRekemList (makat, valid, invalid),
    sx: JSON (optional)
}
*/

import { countRekemValidAndInvalid } from "../../helpers/DashboardHelpers";
import RekemDoughnut from "../Charts/RekemDoughnut";
import { Box, Paper, Typography } from "@mui/material";
const StateInGdudCard = (props) => {
    const rekemData = countRekemValidAndInvalid(props.summarizedRekemList);

    const paperSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bgcolor: "background.paper",
        height: '100%',
        width: '100%',
        padding: 2,
        ...props.sx
    }
    return (
    <Paper sx={paperSX}>
        <Box>
            <Typography variant="h5">המצב בגדוד</Typography>
            <Typography variant="h4" fontWeight="bold">{props.gdud}</Typography>
        </Box>
        <RekemDoughnut {...rekemData} height={100} width ={100}/>
    </Paper>
    );

};


export default StateInGdudCard;