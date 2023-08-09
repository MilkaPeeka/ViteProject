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
                          main: '#ffb3c6',
                          light: '#BE939C'
                        },
                        error: {
                          main: '#db3636'
                        },
                        success: {
                          main: '#2b9c32',
                          light: '#66c96d',
                        },
                        background: {
                          default: '#f7f0e9',
                          paper: '#eae0d5',
                        },
                        text: {
                          primary: '#322601'
                        }
                      }
                    : {
                        // palette values for dark mode
                        primary: {
                          main: '#ffe57f',
                        },
                        secondary: {
                          main: '#ffb8cd',
                          light: '#F2C4D7'
                        },
                        background: {
                          paper: '#1a1a1a',
                        },
                        text: {
                          primary: '#ded8da'
                        }
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
