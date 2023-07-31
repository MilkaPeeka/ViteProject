import { SiteContext } from "../contexts/SiteContext";
import { useContext } from "react";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';


/*
    Default theme using different color palette and supports RTL
*/

const DefaultThemeWrapper = (props) => {
        const ctx = useContext(SiteContext);
        const theme = createTheme({
            direction: 'rtl',
            palette: {
                mode: ctx.isInDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#4527a0',
                  },
                  secondary: {
                    main: '#6200ea',
                  }
                }
          });
          const cacheRtl = createCache({
            key: 'muirtl',
            stylisPlugins: [prefixer, rtlPlugin],
          });
    
        return (
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {props.children}
                </ThemeProvider>
            </CacheProvider>
    
        );
    };

export default DefaultThemeWrapper;
