import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import RekemForm from "../components/AddRekem/RekemForm";
import { useContext, useState } from "react";
import {SiteContext} from "../contexts/SiteContext"
import { Box } from "@mui/material";
const AddRekemView = () => {
    const [newModelCheckValue, setAddNewModel] = useState(false);
    const ctx = useContext(SiteContext);
    const exampleData = {
        isRekemFound: true,
        rekemData: {
            makat: 998372,
            valid: 520,
            invalid: 900,
            gdud: ctx.userData.gdud
        },
        newModelCheckValue,
        setAddNewModel,

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
            <RekemForm {...exampleData} />
            <RekemQueryResult {...exampleData}/>
        </Box>
    </>
    );
};

export default AddRekemView;