// React
import React, { Component, Fragment } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
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
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const styles = {
  ...theme.spreadIt,
  root: {},
  button: {
    ...theme.button,
    height: "50px",
    color: "white",
  },
  logOut: {
    ...theme.button,
    height: "50px",
    color: "red",
    fontWeight: "bold",
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
    width: "50px",
  },
};

export class Navbar extends Component {
  state = {
    searchTerm: "",
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.props.history.push("?q=" + this.state.searchTerm);
    console.log("hello");
  };

  handleChange = (event) => {
    this.state.searchTerm = event.target.value;
  };

  handleLogout = () => {
    this.props.logoutUser();
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
              <Typography variant="h3" className={classes.logoText}>
                Bounty
              </Typography>
            </Button>
            <div className={classes.emptySpace} />
            <form
              className={classes.search}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSearch}
            >
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
                onChange={this.handleChange}
              />
            </form>
            <Button className={classes.button} component={Link} to="/contactus">
              Contact Us
            </Button>{" "}
            {authenticated ? (
              <Fragment>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/postbounty"
                >
                  Post
                </Button>
                <Button
                  className={classes.logOut}
                  component={Link}
                  onClick={this.handleLogout}
                  to="/"
                >
                  Log out
                </Button>
                <IconButton>
                  <img src={HWBountyLogo} className={classes.profileImage} />
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button className={classes.button} component={Link} to="/login">
                  Login
                </Button>{" "}
                <Button
                  className={classes.button}
                  component={Link}
                  to="/signup"
                >
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(
  withRouter(withStyles(styles)(Navbar))
);
