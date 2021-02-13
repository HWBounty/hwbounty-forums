import "./App.css";

// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import home from "./pages/home";
import login from "./pages/login";

import axios from "axios";

const theme = createMuiTheme(themeFile);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={null}>
        <Router>
          <Navbar />
          <Route exact path="/" component={home} />
          <Route path="/login" component={login} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
