import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import RekemForm from "../components/AddRekem/RekemForm";
import { useContext, useEffect, useMemo, useState } from "react";
import {SiteContext} from "../contexts/SiteContext"
import { Box } from "@mui/material";
import { reduceRekemListIntoData } from "../helpers/RekemQueryHelpers";
import mappings from "../mappings";
import { useNavigate } from "react-router-dom/dist";
const AddRekemView = () => {    
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();
    const [newRekemConfirmed, setNewRekemConfirmation] = useState(false);
    const [currentMakat, setCurrentMakat] = useState('');
    const [rekemList, setRekemList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loadRekems = () => {
        ctx.getRekemList()
        .then(result => setRekemList(result))
        .catch(err => console.log(err))
    };

    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
        loadRekems();
        console.log("useEffect Ran. it is normal to run twice with <React.StrictMode> ")
    }, [ctx.sessionData.isLoggedIn]);


    const submitHandler = (rekemData) => {
        console.log(rekemData);
        setIsLoading(true);
        setErrorMessage('');
        ctx.addRekemHandler(rekemData)
        .then(() => loadRekems())
        .catch((err) => setErrorMessage(err.message))
        .finally(() => setIsLoading(false));
        
    };

    const props = {
        ...reduceRekemListIntoData(rekemList, currentMakat),
            gdud: ctx.userData.gdud,
            setNewRekemConfirmation,
            newRekemConfirmed,
            currentMakat,
            setCurrentMakat,
            submitHandler,
            isLoading,
            errorMessage
    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'row',
        margin: 4,
        flexGrow: 1,
        flexBasis: 0
    };

    return (
    <>
        <h1>rekem view page</h1>
        <Box sx={boxSX}>
            <RekemForm {...props} />
            <RekemQueryResult {...props}/>
        </Box>
    </>
    );
};

export default AddRekemView;