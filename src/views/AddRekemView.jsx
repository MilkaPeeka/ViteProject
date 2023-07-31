import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import RekemForm from "../components/AddRekem/RekemForm";
import { useContext, useState } from "react";
import {SiteContext} from "../contexts/SiteContext"
import { Box } from "@mui/material";
const AddRekemView = () => {

    const [newRekemConfirmed, setNewRekemConfirmation] = useState(false);
    const [currentMakat, setCurrentMakat] = useState('');

    const ctx = useContext(SiteContext);

    let queriedRekem;

    ctx.getRekemList()
    .then(() => {
        queriedRekem = 
    });

    const RekemQueryData = {
        ...searchRekem(currentMakat),
        newRekemConfirmed,
        setNewRekemConfirmation,
        currentMakat,
        setCurrentMakat

    }

    const boxSX = {
        display: 'flex',
        flexDirection: 'row',
        margin: 4,
        flexGrow: 1,
        flexBasis: 0
    }
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