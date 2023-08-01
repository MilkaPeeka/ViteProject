/*
props: {
    valid: number,
    invalid: number,
    gdud: number,
    sx: JSON (optional)
}
*/

import RekemDoughnut from "../Charts/RekemDoughnut";
import { Box, Typography } from "@mui/material";
const GdudCard = (props) => {
    const exampleProp = {
        valid: 1200,
        invalid: 2430,
        gdud: 193
    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingX: 8,
        paddingY: 3,
        boxShadow: 3,
        borderRadius: 10,
        ...props.sx
    }
    return (
    <Box sx={boxSX}>
        <Box padding={4}>
            <Typography variant="h3">המצב בגדוד</Typography>
            <Typography variant="h3" fontWeight="bold">{exampleProp.gdud}</Typography>
        </Box>
        <RekemDoughnut valid = {exampleProp.valid} invalid = {exampleProp.invalid} height={250} width = {250}/>
    </Box>
    );

};


export default GdudCard;