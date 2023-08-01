/*
props: {
    rekemList,
    sx: JSON (optional)
}
*/

import { Box, Typography } from "@mui/material";
import GdudGraph from "../Charts/GdudGraph";
import { groupRekemsByMakat, countRekemValidAndInvalidByMakat, transformRekemDataToPercentages } from "../../helpers/DashboardHelpers";
const GdudSummaryGraphCard = (props) => {
    const {rekemList} = props;

    const rekemsGroupedByMakat = groupRekemsByMakat(rekemList);
    const rekemsValidAndInvalid = countRekemValidAndInvalidByMakat(rekemsGroupedByMakat);
    const data = transformRekemDataToPercentages(rekemsValidAndInvalid);
    console.log(data);
    const boxSX = {
        paddingX: 8,
        paddingY: 3,
        boxShadow: 3,
        borderRadius: 10,
        ...props.sx
    }

    return (
    <Box sx={boxSX}>
        <GdudGraph itemList={data} sx={{width: "100%", height: "100%"}}/>
    </Box>
    );

};


export default GdudSummaryGraphCard;