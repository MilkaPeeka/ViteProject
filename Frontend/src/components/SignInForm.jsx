import { Typography, Card, FormGroup, TextField, Button, FormLabel, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import DisplayCard from "./DisplayCard";

/*
props: 
{onSubmitHandler}
{isLoading}
{errorMessage}
sx: optional
*/

const SignInForm = (props) => {
    const {handleSubmit, register, formState} = useForm({
        defaultValues: {
            pernum: ''
        }
    });

    const { errors } = formState;

    const boxSX = {
        padding: 1.5,
        bgcolor: 'primary.light',
        borderRadius: 6,
        ...props.sx
    };

    const cardSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingBottom: 4
    };

    const formGroupSX = {marginTop: 3, padding: 3, width:"100%"};

    const buttonSX = {borderRadius: 3, marginTop: 4, padding: 1.5, width: "20%"};
    return (
        <DisplayCard sx={boxSX}>
            <Card component='form' onSubmit={handleSubmit(props.onSubmitHandler)} sx={cardSX}>
                <Typography variant="h5" mt={3}>הכנס מספר אישי</Typography>
                <FormGroup sx={formGroupSX}>
                    <TextField {...register("pernum", {required: "שדה זה לא יכול להישאר ריק!", pattern: {value:  /^\d+$/, message: "מספר אישי חייב להכיל רק ספרות"}})} error={!!errors.pernum} />
                    {!!errors.pernum &&<FormLabel error sx={{paddingTop: 1}}>{errors.pernum?.message}</FormLabel>}
                </FormGroup>
                {props.errorMessage !== '' && <FormLabel error sx={{paddingTop: 1}}>{props.errorMessage}</FormLabel>}
                {props.isLoading ? <CircularProgress color="primary" /> : <Button variant="contained" type="submit" sx={buttonSX}>התחבר</Button>}
            </Card>
        </DisplayCard>
    );
}

export default SignInForm;