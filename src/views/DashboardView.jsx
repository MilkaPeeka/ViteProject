import { useEffect, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/";
import mappings from "../mappings";
import RekemCardGroup from "../components/Dashboard/RekemCardGroup";
import { Box } from "@mui/material";
import GdudSummaryCard from "../components/Dashboard/GdudSummaryCard";
import GdudSummaryGraphCard from "../components/Dashboard/GdudSummaryGraphCard";
import GeneralRekemStateCard from "../components/Dashboard/GeneralRekemStateCard";


const DashboardView = () => {
    console.log("loaded dashboard");
    const ctx = useContext(SiteContext);
    const navigate = useNavigate();
    const rekemList = ctx.rekemList;
    const [gdudQuery, setGdudQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [gdudQueryRekemList, setGdudQueryRekemList] = useState([]);

    // redirection and initial rekemList loading useEffect
    useEffect(() => {
        if (!ctx.sessionData.isLoggedIn)
            return navigate(mappings.signInPath);
        // console.log("useEffect Ran. it is normal to run twice with <React.StrictMode> ")
    }, [ctx.sessionData.isLoggedIn]);

    // retrieve data from all gduds, for admins only
    useEffect(() => {
        if (!ctx.userData.isManager)
            return;

        if (gdudQuery === '')
            return;

        console.log("user required query:", gdudQuery);
        setIsLoading(true);
        ctx.getRekemListByGdud(gdudQuery)
        .then((result) => setGdudQueryRekemList(result))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));

    }, [ctx.userData.isManager, gdudQuery])

    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginY: 5,
        marginX: 20
    };



    const RekemCardGroupProps = {
        rekemList,
        width: 200,
        height: 250
    };


    const GeneralRekemStateProps = {
        rekemList: gdudQueryRekemList,
        isLoading,
        setGdudQuery,
        sx: {marginTop: 5},
    }
    return (
    <Box sx={boxSX}>
        <GdudSummaryCard sx={{marginBottom: 5}} rekemList={rekemList} gdud={ctx.userData.gdud}/>
        <GdudSummaryGraphCard rekemList = {rekemList} sx={{marginBottom: 5}} graphHeight={"90vh"} />
        <RekemCardGroup {...RekemCardGroupProps}/>
        {ctx.userData.isManager && <GeneralRekemStateCard {...GeneralRekemStateProps} />}
    </Box>
    );
};

export default DashboardView;