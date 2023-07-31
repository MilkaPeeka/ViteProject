/*
props = {
    isRekemFound: boolean,
    rekemData: JSON (optional),
    setAddNewModel: function,
    newModelCheckValue: boolean
}
*/

import { Padding } from "@mui/icons-material";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";

const RekemQueryResult = (props) => {

    const boxSX = {
        bgcolor: props.isRekemFound ? 'success.light' : 'error.light',
        color: "background.default",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        paddingY: 3,

    };

    const failedQueryCheckboxSX = {
        bgcolor: 'background.default',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        paddingY: 1,
        paddingX: 10,
        marginTop: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow effect
    };


    const DisplayText = (props) => {
        return (
            <Box display="flex" flexDirection="row" justifyContent="center">
            <Typography mt={2} variant="h6" paddingX={1}>{props.label}: </Typography>
            <Typography mt={2} variant="h6" fontWeight="bold">{props.value}</Typography>
            </Box>
        );
    }

    const displayData = (
        props.isRekemFound? 
        <>
        <Typography variant="h5">רקמ נמצא בגדוד!</Typography>
        <DisplayText label="מקט" value={props.rekemData.makat} />
        <DisplayText label="תקינים" value={props.rekemData.valid} />
        <DisplayText label="לא תקינים" value={props.rekemData.invalid} />
        <DisplayText label="סיכום אחוזי תקינות הרקמ בגדוד" value={Math.round(100 * props.rekemData.valid / (props.rekemData.valid + props.rekemData.invalid)) + "%"} />

        </>
        :
        <>
        <Typography variant="h5">רקמ לא נמצא בגדוד!</Typography>
        <Typography fontWeight={'bold'} mt={2}>שים לב שהקלדת את המקט הנכון!</Typography>
        <Typography mt={2}>במידה וברצונך להוסיף רקמ מסוג חדש למערכת, אנא לחץ על הכפתור למטה ותאשר את הפעולה.</Typography>
        <FormControlLabel
            control={<Checkbox color="primary" onChange={() => props.setAddNewModel(prevValue => !prevValue)} checked={props.newModelCheckValue}/>} 
            label="ווידאתי שהכנסתי נתונים נכונים וברצוני להוסיף רקמ חדש לגדוד"
            sx={failedQueryCheckboxSX}/> 
        </>
    );

    

    return (
        <Box sx={boxSX}>
            {displayData}
        </Box>
    );

};

export default RekemQueryResult;