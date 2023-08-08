/*
props= {
    summarizedRekemList: (valid, invalid, makat)
    width: number,
    height: number
}
*/
import { Box, TextField, Typography } from "@mui/material";
import RekemCard from "./RekemCard";
import { useState } from "react";

const RekemsInGdudGroupCard = (props) => {
    const summarizedRekemList = props.summarizedRekemList;
    const [rekemQuery, setRekemQuery] = useState('');
    let filteredRekems;
    if (rekemQuery === '')
        filteredRekems = summarizedRekemList;
    else
        filteredRekems = summarizedRekemList.filter(item => item.makat.startsWith(rekemQuery));

    const onChangeHandler = (event) => setRekemQuery(event.target.value);

    
    const rekemCardStyleProps = {
        width: 200,
        height: 250,
        margin: 1
    };


    const scrollableBoxSX = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': { display: 'none' },
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        bgcolor: 'background.paper',
    };

    const headerSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40

    };
    
    const RekemGroupSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        height: '100%',
        ...props.sx
    };

    const ScrollableRekemList = (
        <Box sx={scrollableBoxSX}>
            {filteredRekems.map((item) =>
            <RekemCard {...rekemCardStyleProps} makat={item.makat} key={item.makat} valid={item.valid} invalid={item.invalid}/>)}
        </Box>
    );


    const RekemGroupHeader = (
        <Box sx={headerSX}>
            <Typography sx={{marginTop: 4, marginX: 4, color: 'primary.light'}} variant="h5">חיפוש כלי בגדוד:</Typography>
            <TextField
                sx={{m: 2}}
                label="חיפוש לפי מקט"
                variant="standard"
                onChange={onChangeHandler}
                InputLabelProps={{sx: {color: 'primary.light'}}}


            />
        </Box>
    );

    return (
    <Box sx={RekemGroupSX}>
        {RekemGroupHeader}
        {ScrollableRekemList}
    </Box>
    );

};

export default RekemsInGdudGroupCard;