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
            typography: {
              fontFamily: 'Rubik'
            },
            palette: {
                mode: ctx.isInDarkMode ? 'dark' : 'light',
                  ...(!ctx.isInDarkMode
                    ? {
                        // palette values for light mode
                        primary: {
                          main: '#1d7c63',
                        },
                        secondary: {
                          main: '#8728a9',
                        },
                        error: {
                          main: '#db3636'
                        },
                        success: {
                          main: '#2b9c32',
                          light: '#66c96d',
                        },
                        background: {
                          default: '#fffbf0',
                          paper: '#F8F5F2',
                        },
                        text: {
                          default: '#322601'
                        }
                      }
                    : {
                        // palette values for dark mode
                        primary: {
                          main: '#ffe57f',
                        },
                        secondary: {
                          main: '#f50057',
                        },
                        background: {
                          paper: '#1a1a1a',
                        },
                      }),
                },

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
