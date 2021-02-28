// React
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Home
import Login from "./home/login";
import Signup from "./home/signup";
import PageNotFound from "./home/pagenotfound";
import ContactUs from "./home/contactus";
import SignupConfirmed from "./home/signupconfirmed";

// Forums
import ForumHome from "./forums/forumshome";
import BountyView from "./forums/bountyview";
import PostBounty from "./forums/postbounty";

export const Home = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />{" "}
      <Route exact path="/signupcallback/:token" component={SignupConfirmed} />{" "}
      <Route path="/vsuccess" component={null} />
      <Route path="/doath?code=:code" component={null} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export const Forums = () => {
  return (
    <Switch>
      <Route path="/" component={ForumHome} />
      <Route path="/postbounty" component={PostBounty} />
      <Route exact path="/bountyview/:bountyID" component={BountyView} />
      <Route path="/contactus" component={ContactUs} />
    </Switch>
  );
};
