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

// Icons
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";

// Images
import HWBountyLogo from "../../images/HWBounty-Logo.png";
import { Typography } from "@material-ui/core";

const styles = {
  ...theme.spreadIt,
  searchbar: {
    color: "white",
  },
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
  logoImage: { objectFit: "contain", maxHeight: "50px"},
  logoText: {},
  searchBar: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
};

export class Navbar extends Component {

  search = (e) => {
    if(e.key == 'Enter'){
      console.log("piss");
      this.props.history.push("/search/?q=" + e.target.value);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button href="/" className={classes.logo}>
                <img src={HWBountyLogo} className={classes.logoImage} />
              </Button>
              <Typography className={classes.title} variant="h6" noWrap>
                <Button href="/login" className={classes.button}>
                  Login
                </Button>
                <Button href="/signup" className={classes.button}>
                  Sign Up
                </Button>
              </Typography>
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
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyDown={this.search}
                />
              </div>
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
