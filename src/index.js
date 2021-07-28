import React from "react";
import ReactDOM from "react-dom";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider, createTheme} from "@material-ui/core/styles";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {main: "#546e7a"},
    secondary: {main: "#ff9800"},
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
