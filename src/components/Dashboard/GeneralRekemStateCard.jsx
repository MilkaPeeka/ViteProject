/*
props = {
    setGdudQuery,
    isLoading,
    rekemlist,
    sx
}
*/
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material"
import RekemTable from "./RekemTable";
import { useContext, useEffect, useRef, useState } from "react";
import { SiteContext } from "../../contexts/SiteContext";

const GeneralRekemStateCard = (props) => {

    const searchRef = useRef('');
    const ctx = useContext(SiteContext);
    const [queryRekemList, setQueryRekemList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const headerSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: '100%'

    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: 6,
        ...props.sx
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        ctx.getRekemListByGdud(searchRef.current.value)
        .then((result) => setQueryRekemList(result))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
    const RekemGroupHeader = (
        <Box sx={headerSX}>
            <Typography sx={{marginTop: 4, marginLeft: 4, color: 'primary.light'}} variant="h5">חיפוש לפי גדוד:</Typography>
            <Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                    sx={{m: 2,}}
                    label="חיפוש לפי גדוד"
                    variant="standard"
                    InputLabelProps={{sx: {color: 'primary.light'}}}
                    inputRef={searchRef}/>
                    <Button type="submit" sx={{marginTop: 4, marginRight: 4}}>חפש</Button>
                </form>
            </Box>
        </Box>
    );


    const wasNotTouched = searchRef.current.value === '';
    const isEmptyQuery = searchRef.current.value !== '' && queryRekemList.length === 0;

    return (
        <Box sx={boxSX}>
            {RekemGroupHeader}
            {isLoading ? <CircularProgress color="primary" /> 
            :
            isEmptyQuery ? 
            <Typography variant="h5" textAlign="center" padding={4}>אין רקמים בגדוד זה. לחילופין וודא שהכנסת מספר גדוד נכון</Typography>
            :
            wasNotTouched ? 
            <Typography variant="h5" textAlign="center" padding={4}>הקלד מספר גדוד ולאחר מכן חפש על מנת להציג רקמים</Typography>
            :
            <RekemTable rekemList = {queryRekemList} sx={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: '100%'}} />
            }
        </Box>
    );
    
};

export default GeneralRekemStateCard;