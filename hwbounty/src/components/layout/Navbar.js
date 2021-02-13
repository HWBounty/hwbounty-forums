// React
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Styling
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  render() {
    //const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Button align="left" color="inherit" component={Link} to="/about">
            About
          </Button>
          <div className="nav-container">
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
