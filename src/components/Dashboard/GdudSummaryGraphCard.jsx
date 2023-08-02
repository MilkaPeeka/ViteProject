/*
props: {
    rekemList,
    sx: JSON (optional)
}
*/

import { Box } from "@mui/material";
import GdudGraph from "../Charts/GdudGraph";
import { groupRekemsByMakat, countRekemValidAndInvalidByMakat, transformRekemDataToPercentages } from "../../helpers/DashboardHelpers";
const GdudSummaryGraphCard = (props) => {
    const {rekemList} = props;
    const rekemsGroupedByMakat = groupRekemsByMakat(rekemList);
    const rekemsValidAndInvalid = countRekemValidAndInvalidByMakat(rekemsGroupedByMakat);
    const data = transformRekemDataToPercentages(rekemsValidAndInvalid);
    const boxSX = {
        paddingX: 2,
        paddingY: 3,
        boxShadow: 3,
        borderRadius: 10,
        bgcolor: "background.paper",
        ...props.sx
    }

    return (
    <Box sx={boxSX}>
        <GdudGraph itemList={data} graphHeight = {props.graphHeight}/>
    </Box>
    );

};


export default GdudSummaryGraphCard;