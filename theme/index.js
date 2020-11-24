import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let talisTheme = createMuiTheme({
  palette: {
    primary: { main: "#00A3B0" },
    secondary: { main: "#005479" },
  },
  typography: {
    fontFamily: [
      "Muli",
      "Gill Sans",
      '"Gill Sans MT"',
      '"Helvetica Neue"',
      "Halvetica Arial",
      "sans-serif",
    ].join(","),
  },
  props: {
    // Name of the component
    MuiLink: {
      // The default props to change
      underline: "none", // No more ripple, on the whole application 💣
    },
  },
});

talisTheme = responsiveFontSizes(talisTheme);

export default talisTheme;
