import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/HWBounty-Logo.png";

// Redux stuff
import { connect } from "react-redux";
import { postBounty } from "../redux/actions/dataActions";

// MUI stuff
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadIt,
  a: {
    textDecoration: 'none',
  }
});

class ContactUs extends Component {
  render() {
    const {
      classes,
    } = this.props;
    return (
        <Card className={classes.formCard}>
        <Grid container className={classes.form}>
          <Grid item xs={3} />
          <Grid item sm>
            <img src={AppIcon} alt="hwbounty logo" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Contact Us
            </Typography>
            Need help, get on our <a class={classes.a} href="https://discord.com/invite/mBZUqxDNjt">Discord Server.</a>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ContactUs);
