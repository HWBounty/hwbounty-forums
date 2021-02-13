// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.ico";
import { Link } from "react-router-dom";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";

// Requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  cardContent: {
    textAlign: "center",
  },
});

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errors: {},
      userConfirmedEmail: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleNext = (event) => {
    event.preventDefault();
    axios.get("/emailTaken/" + this.state.email).then((res_obj) => {
      console.log(res_obj);
      this.setState({
        errors: {
          email: res_obj.data
            ? "This email is either invalid or already taken"
            : null,
        },
        userConfirmedEmail: !res_obj.data,
      });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors, userConfirmedEmail } = this.state;
    return (
      <div className={classes.formCard}>
        <Card>
          <Grid container className={classes.form}>
            <Grid item xs={3} />
            <Grid item sm>
              <img
                src={AppIcon}
                alt="hwbounty logo"
                className={classes.image}
              />
              <Typography variant="h2" className={classes.pageTitle}>
                Signup
              </Typography>
              {!userConfirmedEmail ? (
                <Fragment>
                  <form noValidate onSubmit={this.handleNext}>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      className={classes.textField}
                      helperText={errors.email}
                      error={errors.email ? true : false}
                      value={this.state.email}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={loading}
                      onClick={this.handleNext}
                    >
                      Next
                    </Button>
                  </form>
                </Fragment>
              ) : (
                <Fragment>
                  <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      fullWidth
                      disabled={true}
                    />
                    <TextField
                      id="username"
                      name="username"
                      type="text"
                      label="Username"
                      className={classes.textField}
                      helperText={errors.handle}
                      error={errors.handle ? true : false}
                      value={this.state.handle}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      className={classes.textField}
                      helperText={errors.password}
                      error={errors.password ? true : false}
                      value={this.state.password}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      className={classes.textField}
                      helperText={errors.confirmPassword}
                      error={errors.confirmPassword ? true : false}
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={loading}
                    >
                      Signup
                      {loading && (
                        <CircularProgress
                          className={classes.progress}
                          size={30}
                        />
                      )}
                    </Button>
                  </form>
                </Fragment>
              )}
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Grid>
                <Button variant="contained" className={classes.button}>
                  Sign in with Discord
                </Button>
                <br />
                <Button variant="contained" className={classes.button}>
                  Sign in with Google
                </Button>
              </Grid>
              <br />
              <small>
                Already have an account ? login <Link to="/login">here</Link>
              </small>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Card>
      </div>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
