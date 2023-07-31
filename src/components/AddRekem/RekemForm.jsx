/*
props = {
    isRekemFound: boolean,
    gdud: string,
    rekemData: JSON (optional),

    setNewRekemConfirmation: function,
    newRekemConfirmed: boolean

    setCurrentMakat: function,
    currentMakat: string
}
*/

import { useForm } from "react-hook-form";
import { Card, FormGroup, FormLabel, TextField, Checkbox, Button, FormControlLabel } from "@mui/material";

const RekemForm = (props) => {
    const {formState, handleSubmit, register} = useForm({
        defaultValues: {
            makat: '',
            serialNum: '',
            isRekemValid: false
        }
    });

    const { errors } = formState;

    const onSubmit = data => console.log(data);
    
    const formSX = {
        padding: 2,
        borderRadius: 6,
        flexBasis: 0, 
        flexGrow: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    };

    const isCheckboxConfirmationNeeded = props.isRekemFound ? false : !props.newModelCheckValue;
    return (
        <Card onSubmit={handleSubmit(onSubmit)} component='form' sx={formSX}>
            <FormGroup mb={3}>
                <FormLabel mb={1}>מספר גדוד</FormLabel>
                <TextField variant="outlined" disabled value={props.rekemData.gdud}/>
            </FormGroup>

            <FormGroup mb={3}>
                <FormLabel mb={1}>הכנס מקט רקמ</FormLabel>
                <TextField variant="outlined" label="מקט רקמ" {...register("makat", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מקט חייב להכיל רק ספרות"}, onChange: (e) => console.log(e.target.value)})} error={!!errors.makat} />
                {!!errors.makat &&<FormLabel error mb={1}>{errors.makat?.message}</FormLabel>}
            </FormGroup>

            <FormGroup mb={3}>
                <FormLabel mb={1}>הכנס מספר ייחודי של רקמ</FormLabel>
                <TextField variant="outlined" label="מספר ייחודי" {...register("serialNum", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מספר ייחודי חייב להכיל רק ספרות "}})} error={!!errors.serialNum} />
                {!!errors.serialNum && <FormLabel error mb={1}>{errors.serialNum?.message}</FormLabel>}
            </FormGroup>

            <FormGroup>
                <FormControlLabel control={<Checkbox {...register("isRekemValid")}/>} label="הכלי כשיר" />
            </FormGroup>
            <Button variant="contained" type="submit" disabled={isCheckboxConfirmationNeeded}>הוסף רקמ למערכת!</Button>
        </Card>  
        
        );
};

export default RekemForm;