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

class CommentView extends Component {
  getComments = () => {};

  render() {
    return (
      <Grid container>
        <div></div>
      </Grid>
    );
  }
}

Navbar.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(CommentView);
