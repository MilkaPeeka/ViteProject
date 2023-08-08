import { Box, Divider, LinearProgress, Typography } from "@mui/material";

/*
props: {
    barColor,
    sx,
    HeaderMainTitle,
    HeaderSubTitle,
    cardDataMainTitle,
    cardDataSubTitle,
    barValueArray
}
*/

const StatusCard = ({barColor, barValueArray, sx, HeaderMainTitle, HeaderSubTitle, CardMainTitle, CardSubTitle,}) => {

    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 3,
        height: '100%',
        ...sx
    };

    const mainCardDataSX = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const cardDataSX = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const CardHeader = ({mainHeader, subHeader}) => {
        return (
        <Box>
            <Typography color="text.secondary" variant="h5" >{mainHeader}</Typography>
            <Typography fontWeight="bold" variant="h4">{subHeader}</Typography>
        </Box>
        );
    };

    const CardData = ({mainHeader, subHeader}) => {
        return (
            <Box sx={cardDataSX}>
                <Typography fontWeight="bold" variant="h4">{mainHeader}</Typography>
                <Typography fontWeight="medium" variant="body1" color="text.secondary">{subHeader}</Typography>
            </Box>
        );
    };

    const CardProgressBar = ({color, valueArray}) => {
        return (
            <Box>
                <LinearProgress variant="determinate" color={color} sx={{height: 9, borderRadius: 10}} value={100 * (+valueArray[0] / +valueArray[2])}/>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 0.5}}>
                    <Typography color="text.secondary" variant="subtitle2" fontWeight='bold'>{valueArray[0]}</Typography>
                    <Typography color="text.secondary" variant="subtitle2" fontWeight='medium'>{valueArray[1]}</Typography>
                    <Typography color="text.secondary" variant="subtitle2" fontWeight='bold'>{valueArray[2]}</Typography>
                </Box>
            </Box>
        );
    };



    return (
        <Box sx={boxSX}>
            <Box sx={mainCardDataSX}>
                <CardHeader mainHeader = {HeaderMainTitle} subHeader = {HeaderSubTitle}/>
                <CardData mainHeader = {CardMainTitle} subHeader = {CardSubTitle} />
            </Box>
            <Divider/>
            <CardProgressBar color={barColor} valueArray={barValueArray}/>
        </Box>
    );
};

export default StatusCard;