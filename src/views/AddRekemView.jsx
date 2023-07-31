import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import RekemForm from "../components/AddRekem/RekemForm";
import { useContext, useEffect, useMemo, useState } from "react";
import {SiteContext} from "../contexts/SiteContext"
import { Box } from "@mui/material";
import { reduceRekemListIntoData } from "../helpers/RekemQueryHelpers";
import mappings from "../mappings";
import { useNavigate } from "react-router-dom/dist";
const AddRekemView = () => {
    const [newRekemConfirmed, setNewRekemConfirmation] = useState(false);
    const [currentMakat, setCurrentMakat] = useState('');
    const [rekemList, setRekemList] = useState([]);
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate('/' + mappings.signInPath);

        console.log("useEffect Ran. it is normal to run twice with <React.StrictMode> ")
        ctx.getRekemList()
        .then(result => {
            setRekemList(result);
        })
        .catch(err => {
            console.log(err);
        })
    }, [ctx.sessionData.isLoggedIn]);


    const RekemQueryData = {
        ...reduceRekemListIntoData(rekemList, currentMakat),
            gdud: ctx.userData.gdud,
            setNewRekemConfirmation,
            newRekemConfirmed,
            currentMakat,
            setCurrentMakat
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
            <RekemForm {...RekemQueryData} />
            <RekemQueryResult {...RekemQueryData}/>
        </Box>
    </>
    );
};

export default AddRekemView;