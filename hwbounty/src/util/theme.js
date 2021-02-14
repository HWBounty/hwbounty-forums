import { createMuiTheme } from "@material-ui/core/styles";

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#12adc9",
      main: "#12adc9",
      dark: "#1e376b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f04941",
      main: "#f04941",
      dark: "#7d2824",
      contrastText: "#fff",
    },
  },
  spreadIt: {
    points: {
      color: "#2c387e",
      fontType: "bold",
    },
    aboutBackground: {
      backgroundColor: "#CCCCCC",
    },
    typography: {
      useNextVariants: true,
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
      fontFamilySecondary: "'Roboto Condensed', sans-serif",
    },
    rootPadding: {
      marginLeft: "30px",
      marginRight: "30px",
      marginTop: "30px",
    },
    form: {
      textAlign: "center",
    },
    formCard: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      padding: "15px",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "15px auto 15px auto",
    },
    textField: {
      margin: "15px auto 15px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
});

const rawDarkTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#12adc9",
      main: "#12adc9",
      dark: "#1e376b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f04941",
      main: "#f04941",
      dark: "#7d2824",
      contrastText: "#fff",
    },
  },
  spreadIt: {
    points: {
      color: "#2c387e",
      fontType: "bold",
    },
    aboutBackground: {
      backgroundColor: "#CCCCCC",
    },
    typography: {
      useNextVariants: true,
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
      fontFamilySecondary: "'Roboto Condensed', sans-serif",
    },
    rootPadding: {
      marginLeft: "30px",
      marginRight: "30px",
    },
    form: {
      textAlign: "center",
    },
    formCard: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      padding: "15px",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "15px auto 15px auto",
    },
    textField: {
      margin: "15px auto 15px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: "uppercase",
};

const theme = {
  ...rawTheme,
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

const darkTheme = {
  ...rawDarkTheme,
  typography: {
    ...rawDarkTheme.typography,
    fontHeader,
    h1: {
      ...rawDarkTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawDarkTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawDarkTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawDarkTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawDarkTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawDarkTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawDarkTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawDarkTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawDarkTheme.typography.body2,
      fontWeight: rawDarkTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawDarkTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
