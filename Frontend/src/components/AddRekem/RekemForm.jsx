/*
props = {
    isRekemFound: boolean,
    gdud: string,
    rekemData: JSON (optional),

    setNewRekemConfirmation: function,
    newRekemConfirmed: boolean

    setCurrentMakat: function,
    currentMakat: string,

    submitHandler: function,
    isLoading: boolean,
    
    errorMessage: string
    sx: JSON (optional)
}
*/

import { useForm } from "react-hook-form";
import { Card, FormGroup, FormLabel, TextField, Checkbox, Button, FormControlLabel, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard";

const RekemForm = (props) => {
    const [successful, setSuccessful] = useState(false);
    const {formState, handleSubmit, register, reset, watch} = useForm({
        defaultValues: {
            makat: '',
            serialNum: '',
            isRekemValid: false
        }
    });
    const { errors, isDirty } = formState;

    useEffect(() => {
        if (isDirty && !props.isLoading && props.errorMessage === ''){
            reset();
            setSuccessful(true);
            props.setCurrentMakat('');
        }
        if (props.isLoading){
            setSuccessful(false);
        }
    }, [props.isLoading]);

    
    const formSX = {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 2,
    };

    const isCheckboxConfirmationNeeded = props.isRekemFound ? false : !props.newRekemConfirmed;
    return (
        <DisplayCard sx={formSX}>
            <form onSubmit={handleSubmit(props.submitHandler)}>
                <FormGroup mb={3}>
                    <FormLabel mb={1}>מספר גדוד</FormLabel>
                    <TextField variant="outlined" disabled value={props.gdud}/>
                </FormGroup>

                <FormGroup mb={3}>
                    <FormLabel mb={1}>הכנס מקט רקמ</FormLabel>
                    <TextField variant="outlined" label="מקט רקמ" {...register("makat", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מקט חייב להכיל רק ספרות"}, onChange: (e) => props.setCurrentMakat(e.target.value)})} error={!!errors.makat} />
                    {!!errors.makat &&<FormLabel error sx={{paddingTop: 1}}>{errors.makat?.message}</FormLabel>}
                </FormGroup>

                <FormGroup mb={3}>
                    <FormLabel mb={1}>הכנס מספר ייחודי של רקמ</FormLabel>
                    <TextField variant="outlined" label="מספר ייחודי" {...register("serialNum", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מספר ייחודי חייב להכיל רק ספרות "}})} error={!!errors.serialNum} />
                    {!!errors.serialNum && <FormLabel error sx={{paddingTop: 1}}>{errors.serialNum?.message}</FormLabel>}
                </FormGroup>

                <FormGroup>
                    <FormControlLabel control={<Checkbox {...register("isRekemValid")} checked={watch('isRekemValid')}/>} label="הכלי כשיר" />
                </FormGroup>
                {props.errorMessage !== '' && <FormLabel error sx={{paddingTop: 1}}>{props.errorMessage}</FormLabel>}
                {successful && <FormLabel sx={{paddingTop: 1, color:"success.light"}}>רקמ נוסף למערכת בהצלחה!</FormLabel>}
                {props.isLoading ? <CircularProgress color="primary" /> : <Button variant="contained" type="submit" disabled={isCheckboxConfirmationNeeded}>הוסף רקמ למערכת!</Button>}
            </form> 
        </DisplayCard>
        );
};

export default RekemForm;