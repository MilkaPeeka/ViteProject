import { useContext, useState } from "react";
import { SiteContext } from "../contexts/SiteContext";
import { AppBar, Box, Button, IconButton, Toolbar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import mappings from "../mappings";
import SchoolIcon from '@mui/icons-material/School';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from "react-router-dom";
const Navbar = () => {
    const ctx = useContext(SiteContext);
    console.log(ctx);

    const [alignment, setAlignment] = useState(ctx.isInDarkMode ? 'moon' : 'sun');
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
        setAlignment(newAlignment);
        ctx.toggleDarkmode();
        }
    };


    const DarkModeToggleButtonGroup =
        (
        <ToggleButtonGroup value={alignment} exclusive onChange={handleChange} aria-label="set dark mode">
          <ToggleButton value="sun">
            <WbSunnyIcon />
          </ToggleButton>
          <ToggleButton value="moon">
            <ModeNightIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      );


    const buttonsGroup = (
        <Box>
            <IconButton component={Link} to={'/' + mappings.devPath} color={ctx.isInDarkMode ? 'primary' : 'inherit'} size={'large'} aria-label='logo'><SchoolIcon/></IconButton>
            {ctx.sessionData.isLoggedIn && <Button component={Link} to={'/' + mappings.dashboardPath} variant="text" size="large" color={ctx.isInDarkMode ? 'primary' : 'inherit'}>מסך מידע</Button>}
            {ctx.sessionData.isLoggedIn && ctx.userData.isManager && <Button component={Link} to={'/' + mappings.addRekemPath} variant="text" size="large" color={ctx.isInDarkMode ? 'primary' : 'inherit'}>הוספת רקמ</Button>}
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} marginX="10%">
                        {buttonsGroup}
                        {DarkModeToggleButtonGroup}
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    );
};

export default Navbar;