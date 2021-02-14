import "./App.css";

// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Styling
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PageNotFound from "./pages/pagenotfound";
import BountyView from "./pages/bountyview";
//import doath from "./pages/doath";

import axios from "axios";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://api.hwbounty.help";

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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/bountyview/*" component={BountyView} />
                <Route path="/vsuccess" component={null} />
                <Route path="/doath*" component={null} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
