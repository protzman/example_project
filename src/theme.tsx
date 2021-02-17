import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const colors = {
  iceye01: '#134e5e',
  iceye02: '#71b17f',
};

const theme = createMuiTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.iceye01,
    },
    secondary: {
      main: colors.iceye02,
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h4: {
      fontWeight: 100,
    },
  },
});

theme.components = {
  MuiTextField: {
    defaultProps: {
      variant: 'filled',
      fullWidth: true,
      InputProps: {
        disableUnderline: true,
        autoComplete: 'off',
        fullWidth: true,
      },
    },
    styleOverrides: {
      root: {
        background: theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
};

export default responsiveFontSizes(theme);
