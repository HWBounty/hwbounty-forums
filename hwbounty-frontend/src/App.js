import "./App.css";

// React
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Styling
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Subdomains
import { Home, Forums } from "./pages/subdomains";

// Components
import Navbar from "./components/layout/Navbar";

import axios from "axios";

const theme = createMuiTheme(themeFile);

// Configure login/api
axios.defaults.baseURL = "https://api.hwbounty.help";
const token = localStorage.DBIdToken;
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData());
}

// Configure subdomain
let host = window.location.host;
let protocal = window.location.protocol;
let parts = host.split(".");
let subdomain = "";

if (parts.length >= 3) {
  subdomain = parts[0];
  parts.splice(0, 1);
  //window.location = protocal + "//" + parts.join(".") + "/" + subdomain;
}

let isHome = subdomain == "";
let isForums = subdomain == "forums";

class App extends Component {
  render() {
    return (
      <div className="main-background" style={{ backgroundColor: "#DAE0E6" }}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <div>
                <Navbar />
              </div>
              {isHome && <Route exact path="/" component={Home} />}
              {isForums && <Route component={Forums} />}
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
