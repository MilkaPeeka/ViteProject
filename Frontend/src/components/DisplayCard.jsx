/*
Reusable card with rounded corners and shadows.
props ={
    sx,
    children
}
*/

import { Paper } from "@mui/material";

const DisplayCard = (props) => {
    const paperSX = {
        borderRadius: 10,
        ...props.sx
    };
    return (
        <Paper sx={paperSX}>
            {props.children}
        </Paper>
    );
};


export default DisplayCard;