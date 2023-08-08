/*
props: {
    summarizedRekemList(valid, invalid, makat),
    sx: JSON (optional)
}
*/

import { transformRekemDataToPercentages } from "../../helpers/DashboardHelpers";
import GdudGraph from "../Charts/GdudGraph";
import DisplayCard from "../DisplayCard";
const StateInGdudGraphCard = (props) => {
    const data = transformRekemDataToPercentages(props.summarizedRekemList);
    const boxSX = {
        paddingY: 3,
        ...props.sx
    }

    return (
    <DisplayCard sx={boxSX}>
        <GdudGraph itemList={data}/>
    </DisplayCard>
    );

};


export default StateInGdudGraphCard;