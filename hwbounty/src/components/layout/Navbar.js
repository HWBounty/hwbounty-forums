// React
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Styling
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";

// Images
import HWBountyLogo from "../../images/HWBounty-Logo.png";

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    flexGrow: 1,
  },
  logo: {
    objectFit: "fill",
    maxWidth: "100px",
    maxHeight: "100px",
  },
});

class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <div className="nav-container">
              <img src={HWBountyLogo} className={classes.logo} />
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
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
