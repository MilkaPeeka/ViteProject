/*
props = {
    isRekemFound: boolean,
    rekemData: JSON (optional),
    
    gdud: string,

    setNewRekemConfirmation: function,
    newRekemConfirmed: boolean

    setCurrentMakat: function,
    currentMakat: string,

    submitHandler: function
}
*/

import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect } from "react";
const RekemQueryResult = (props) => {
    useEffect(() => {
        if (!props.isLoading && props.errorMessage === ''){
            props.setNewRekemConfirmation(false);    
        }
    }, [props.isLoading]);

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


    const LabelValueTypography = (props) => {
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
            <LabelValueTypography label="מקט" value={props.rekemData.makat} />
            <LabelValueTypography label="תקינים" value={props.rekemData.valid} />
            <LabelValueTypography label="לא תקינים" value={props.rekemData.invalid} />
            <LabelValueTypography label="אחוזי תקינות הרקמ בגדוד" value={Math.round(100 * props.rekemData.valid / (props.rekemData.valid + props.rekemData.invalid)) + "%"} />
        </>
        :
        <>
            <Typography variant="h5">רקמ לא נמצא בגדוד!</Typography>
            <Typography fontWeight={'bold'} mt={2}>שים לב שהקלדת את המקט הנכון!</Typography>
            <Typography maxWidth="80%" mt={2}>במידה וברצונך להוסיף רקמ מסוג חדש למסד הנתונים של הגדוד, אנא לחץ על הכפתור למטה ואשר את הפעולה.</Typography>
            <FormControlLabel
                control={<Checkbox color="primary" onChange={() => props.setNewRekemConfirmation(prevValue => !prevValue)} checked={props.newRekemConfirmed}/>} 
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