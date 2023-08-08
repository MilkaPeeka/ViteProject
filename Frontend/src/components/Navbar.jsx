import { useContext, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { AppBar, Box, Button, IconButton, Toolbar, ToggleButton, ToggleButtonGroup, CircularProgress } from "@mui/material";
import mappings from "../mappings";
import SchoolIcon from '@mui/icons-material/School';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const ctx = useContext(SiteContext);
    const [alignment, setAlignment] = useState(ctx.isInDarkMode ? 'moon' : 'sun');
    const [isLoadingLoggingOut, setLoadingLoggingOut] = useState(false);
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
        setAlignment(newAlignment);
        ctx.toggleDarkmode();
        }
    };

    const onLogOut = () => {
        setLoadingLoggingOut(true);
        ctx.onLogOutHandler()
        .then(() => setLoadingLoggingOut(false))
        .catch(err => console.log(err));
    };

    const rightButtonsSX = {
        color: ctx.isInDarkMode? "primary.light" : 'white',
        "&.active": {
            color: "primary",
            backgroundColor: ctx.isInDarkMode? "background.paper" : 'primary.light'
        }
    };

    const leftButtonsSX = {color: ctx.isInDarkMode ? 'primary.main' : 'white'};


    const darkModeButtonGroup = (
        <ToggleButtonGroup value={alignment} exclusive onChange={handleChange} aria-label="set dark mode">
            <ToggleButton value="sun"><WbSunnyIcon sx={leftButtonsSX} /></ToggleButton>
            <ToggleButton value="moon"><ModeNightIcon sx={leftButtonsSX}/></ToggleButton>
        </ToggleButtonGroup>
    );

    const LeftButtonGroup = (
        <Box display="flex" flexDirection="row">
        {isLoadingLoggingOut && <CircularProgress color="warning" sx={{marginRight: 9}}/>}
        {!isLoadingLoggingOut && ctx.sessionData.isLoggedIn && <Button variant="contained" color="warning" onClick={onLogOut} sx={{marginRight: 6}}>התנתקות</Button>}
        {!ctx.sessionData.isLoggedIn && <Button component={Link} to={mappings.signInPath} variant="contained" color="success" sx={{marginRight: 6}}>התחברות</Button>}
        {darkModeButtonGroup}
        </Box>

      );


    const RightButtonGroup = (
        <Box>
            <IconButton component={NavLink} to={mappings.devPath} size={'large'} aria-label='logo'><SchoolIcon sx={{color: ctx.isInDarkMode ? 'primary.main' : 'white'}}/></IconButton>
            {ctx.sessionData.isLoggedIn && <Button component={NavLink} to={mappings.dashboardPath} variant="text" size="large" sx={rightButtonsSX} >מסך מידע</Button>}
            {ctx.sessionData.isLoggedIn && ctx.userData.isManager && <Button component={NavLink} to={mappings.addRekemPath} variant="text" size="large" sx={rightButtonsSX}>הוספת רקמ</Button>}
        </Box>
    );

    return (
        <AppBar position="static" sx={{maxHeight: '10vh'}}>
            <Toolbar>
                <Box display="flex" justifyContent="space-between" flexGrow={1} marginX="10%">
                    {RightButtonGroup}
                    {LeftButtonGroup}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;