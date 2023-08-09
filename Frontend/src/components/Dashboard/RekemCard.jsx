/*
props = {
    makat: string
    valid: number
    invalid: number,
    width: nubmer,
    height: number,
    margin: props.margin
}
*/

import { Typography, Box } from "@mui/material";
import RekemDoughnut from "../Datastructures/RekemDoughnut";

const RekemCard = (props) => {
    const boxSX = {
        borderRadius: 5,
        boxShadow: 3,
        paddingY: 1.5,
        display: "flex",
        flexDirection: "column",
        width: props.width,
        height: props.height,
        margin: props.margin,
        bgcolor: "background.default"
    };


    return (
        <Box sx={boxSX}>
            <Typography fontWeight="bold" textAlign="center">{props.makat}</Typography>
            <RekemDoughnut {...props}/>
        </Box>
    );
};

export default RekemCard;
