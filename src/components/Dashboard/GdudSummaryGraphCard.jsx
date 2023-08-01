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
        paddingX: 2,
        paddingTop: 3,
        boxShadow: 3,
        borderRadius: 10,
        ...props.sx
    }

    return (
    <Box sx={boxSX}>
        <GdudGraph itemList={data} sx={props.sx}/>
    </Box>
    );

};


export default GdudSummaryGraphCard;