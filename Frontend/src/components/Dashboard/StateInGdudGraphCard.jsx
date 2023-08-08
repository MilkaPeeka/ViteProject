/*
props: {
    summarizedRekemList(valid, invalid, makat),
    sx: JSON (optional)
}
*/

import { Box } from "@mui/material";
import { transformRekemDataToPercentages } from "../../helpers/DashboardHelpers";
import GdudGraph from "../Charts/GdudGraph";
const StateInGdudGraphCard = (props) => {
    const data = transformRekemDataToPercentages(props.summarizedRekemList);
    const boxSX = {
        paddingY: 3,
        boxShadow: 3,
        borderRadius: 10,
        bgcolor: "background.paper",
        ...props.sx
    }

    return (
    <Box sx={boxSX}>
        <GdudGraph itemList={data}/>
    </Box>
    );

};


export default StateInGdudGraphCard;