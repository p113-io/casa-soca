import {useState, useEffect} from 'react';
import { Button } from '@mui/joy';
import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsTheme as createCssVarsTheme } from '@mui/system';
import {
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import colors from '@mui/joy/colors';
import {
  useColorScheme,
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  shouldSkipGeneratingVar as joyShouldSkipGeneratingVar,
} from '@mui/joy/styles';

import propTypes  from 'prop-types';

// animated icon for dark or light mode
import { Around } from "@theme-toggles/react"
import "@theme-toggles/react/css/Around.css"

////////////////////
// CssVarsProvider: theme variables for MUI Joy UI theme 
////////////////
const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    dark: {
      palette: {
        background: {
          surface: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        },
        primary: {
          solidBg: 'var(--joy-palette-primary-600)',       // the initial background
          solidColor: '#fff',                              // the initial color
          solidHoverBg: 'var(--joy-palette-primary-700)',  // the :hover background
          solidActiveBg: 'var(--joy-palette-primary-800)', // the :active background
          main: '#e64215',
        },
         neutral: {
          solidBg: 'var(--joy-palette-primary-700)',
          solidColor: '#fff',
          solidHoverBg: 'var(--joy-palette-primary-800)',
          solidActiveBg: 'var(--joy-palette-primary-900)',
          // ...other tokens
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: '#00406d'
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
      typography: {
        fontFamily: '"MyriadPro-Regular", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        h1: {
          fontFamily: 'Gotham-Bold',
          fontSize: '2.4rem',
          fontWeight: 700,
          lineHeight: '1.3em'
        },
        h2: {
          fontFamily: 'Gotham-Bold',
          fontSize: '1.8706rem',
          fontWeight: 700,
          letterSpacing: '.03rem'
        },
        h3: {
          fontFamily: 'Gotham-Bold',
          fontSize: '1.8rem',
          fontWeight: 700,
          letterSpacing: 0
        },
        h4: {
          fontFamily: 'Gotham-Bold',
          fontSize: '1.6rem',
          fontWeight: 700,
        },
        h5: {
          fontFamily: 'Gotham-Medium',
          fontSize: '1.4rem',
          fontWeight: 400,
        },
        body1: {
          fontFamily: 'MyriadPro-Regular',
          fontSize: '1rem',
          lineHeight: "1.4rem"
        },
        body2: {
          fontFamily: 'MyriadPro-Regular',
          fontSize: '0.7rem',
          lineHeight: "1.4rem"
        },
        display1: {
          fontFamily: 'Gotham-Bold',
          fontSize: '2.8rem',
          fontWeight: 700,
          lineHeight: '1.23em',
          letterSpacing: .1
        },
        button: {
          fontFamily: 'Gotham-Bold',
          fontWeight: 700,
        },
      },
    }
  },
});

//////////////////
// CssVarsProvider: theme variables for Joy UI theme 
////////////////
const { unstable_sxConfig: joySxConfig, ...joyTheme } = extendJoyTheme({
  shouldSkipGeneratingVar: (keys) => joyShouldSkipGeneratingVar(keys)
});

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
const mergedTheme = deepmerge(muiTheme, joyTheme);

////////////////////
// merge theme variables for MUI 
// between: 
//    MUI Joy UI theme: https://mui.com/joy/api/theme/
//    Mui Sx config: https://mui.com/joy/api/sx-config/
////////////////
mergedTheme.unstable_sxConfig = {
  ...muiSxConfig,
  ...joySxConfig
};

////////////////////
// Theme for MUI Joy UI theme 
// Required:
//    children: 
////////////////
const Theme = ({children}) => {
  return (
    <CssVarsProvider 
      defaultMode='dark'
      theme={createCssVarsTheme(mergedTheme)}
    >
      {children}
    </CssVarsProvider>
  )
};
// PropTypes for Theme
Theme.propTypes = {
  children: propTypes.node.isRequired
};

export default Theme;

////////////////
// ModeSwitcher
// useEffect: 
//    Render option: once at the beginning
//    Render option: once at the end
//    Render option: every time 
//     
// Switch between:
//    light mode : https://mui.com/joy/api/mode-switcher
//    dark mode : https://mui.com/joy/api/mode-switcher
////////////////
export const ModeSwitcher = ({sx}) => {
  ///////////////////
  // useColorScheme
  // Return:
  //    mode: 'light' or 'dark'
  //    setMode: set mode to 'light' or 'dark'  
  ////////////////
  const { mode, setMode } = useColorScheme();
  ////////////////
  // useState
  // Return:
  //    mounted: true or false: as mounted or not
  //    setMounted: set mounted to true or false
  ////////////////
  const [mounted, setMounted] = useState(false);
  
  // useEffect for server-side rendering
  // Read more on https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // for server-side rendering 
  // Read more on https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  if (!mounted) {
    // for server-side rendering
    // Read more on https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <Around 
      style={sx}
      duration={250} 
      onClick={() => setMode((mode === 'light') ?'dark' : 'light')}
      reversed={(mode === 'light') ? false : true}
    />
  );
};
// PropTypes for ModeSwitcher
ModeSwitcher.propTypes = {
  sx: propTypes.object
};
