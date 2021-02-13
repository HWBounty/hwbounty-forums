// React
import React, { Component, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
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
import { fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";

// Images
import HWBountyLogo from "../../images/HWBounty-Logo.png";

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
    overflowY: "hidden",
  },
  logo: {},
  logoImage: {
    objectFit: "contain",
    maxHeight: "50px",
    marginRight: theme.spacing(1),
  },
  logoText: { fontFamily: "Fantasy" },
  emptySpace: { flexGrow: 1 },
  searchBar: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  profileImage: {
    borderRadius: "50%",
    width: "40px",
  },
};

export class Navbar extends Component {
  search = (e) => {
    if (e.key == "Enter") {
      console.log("piss");
      this.props.history.push("?q=" + e.target.value);
    }
  };

  render() {
    const { classes, authenticated } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button href="/" className={classes.logo}>
              <img src={HWBountyLogo} className={classes.logoImage} />
              <Typography
                variant="h3"
                color="secondary"
                className={classes.logoText}
              >
                HW
              </Typography>
              <Typography
                variant="h3"
                color="textPrimary"
                className={classes.logoText}
              >
                Bounty
              </Typography>
            </Button>
            <div className={classes.emptySpace} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                id="search"
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={this.search}
              />
            </div>
            <Button className={classes.button} href={authenticated ? "/" : "/login"}>
              {authenticated ? <img src={HWBountyLogo} /> : "Login"}
            </Button>
            {authenticated ? null : <Button className={classes.button} href="/signup">
              Signup
            </Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navbar));
