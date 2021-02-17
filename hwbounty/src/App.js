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

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PageNotFound from "./pages/pagenotfound";
import PostBounty from "./pages/postbounty";
import BountyView from "./pages/bountyview";
import ContactUs from "./pages/contactus";
import SignupConfirmed from "./pages/signupconfirmed";
//import doath from "./pages/doath";

import axios from "axios";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://api.hwbounty.help";
const token = localStorage.DBIdToken;
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData());
}

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
                <Route path="/postbounty" component={PostBounty} />
                <Route exact path="/bountyview/:bountyID" component={BountyView} />
                <Route exact path="/signupcallback/:token" component={SignupConfirmed} />
                <Route path="/contactus" component={ContactUs} />
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
