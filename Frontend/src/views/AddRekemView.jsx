import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import RekemForm from "../components/AddRekem/RekemForm";
import { useContext, useEffect, useState } from "react";
import {SiteContext} from "../contexts/SiteContext"
import { Box } from "@mui/material";
import mappings from "../mappings";
import { useNavigate } from "react-router-dom/dist";

const AddRekemView = () => {    
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();
    const [newRekemConfirmed, setNewRekemConfirmation] = useState(false);
    const [currentMakat, setCurrentMakat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
        // console.log("useEffect Ran. it is normal to run twice with <React.StrictMode> ")
    }, [ctx.sessionData.isLoggedIn]);


    const submitHandler = (rekemData) => {
        console.log(rekemData);
        setIsLoading(true);
        setErrorMessage('');
        ctx.addRekemHandler(rekemData)
        .then(() => {
            ctx.getSummarizedRekemList().then(() => console.log("updaed summarized rekem list"));
        })
        .catch((err) => setErrorMessage(err.message))
        .finally(() => setIsLoading(false));
        
    };

    const props = {
        summarizedRekemList: ctx.summarizedRekemList,
        gdud: ctx.userData.gdud,
        setNewRekemConfirmation,
        newRekemConfirmed,
        currentMakat,
        setCurrentMakat,
        submitHandler,
        isLoading,
        errorMessage,
        sx: {
            marginLeft: 7,
            flexBasis: 0,
            flexGrow: 1
        }
    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'row',
        marginX: 15,
        marginTop: 10,
    };

    return (
        <Box sx={boxSX}>
            <RekemForm {...props} />
            <RekemQueryResult {...props}/>
        </Box>
    );
};

export default AddRekemView;