import RekemQueryResult from "../components/AddRekem/RekemQueryResult";
import { useState } from "react";

const AddRekemView = () => {
    const [newModelCheckValue, setAddNewModel] = useState(false);
    return (
    <>
        <RekemQueryResult isRekemFound = {false} newModelCheckValue={newModelCheckValue} setAddNewModel={setAddNewModel} rekemData = {{
            makat: 998372,
            valid: 520,
            invalid: 900
        }}/>
    </>
    );
};

export default AddRekemView;