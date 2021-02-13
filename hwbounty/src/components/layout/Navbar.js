// React
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Styling
import theme from "./../../util/theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";

// Images
import HWBountyLogo from "../../images/HWBounty-Logo.png";
import { Typography } from "@material-ui/core";

const styles = {
  ...theme.spreadIt,
  root: {},
  button: {
    ...theme.button,
    height: "50px",
    color: "white",
  },
  navBar: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {},
  logoImage: { objectFit: "contain" },
  logoText: {},
  searchBar: {},
};

export class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.navBar}>
          <div className={classes.logo}>
            <Button href="/" className={classes.logo}>
              <img src={HWBountyLogo} className={classes.logoImage} />
              <Typography>HWBounty</Typography>
            </Button>
          </div>
          <Grid container justify="center" spacing={0}>
            <Grid item xs={0}>
              <Button href="/login" className={classes.button}>
                Login
              </Button>
            </Grid>
            <Grid item xs={0}>
              <Button href="/signup" className={classes.button}>
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={0}>
              <InputBase
                className={classes.searchBar}
                color="secondary"
                placeholder="Search"
                inputProps={{ "aria-label": "Seach HWBounty!" }}
              />
              <IconButton type="submit" className={classes.button}>
                <SearchIcon color="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
