// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AppIcon from "../../images/favicon.ico";
import { Link } from "react-router-dom";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";

// Requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

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
      firstName: "",
      lastName: "",
      errors: {},
      userConfirmedEmail: false,
      signupSuccess: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    this.setState({
      ...this.state,
      signupSuccess: nextProps.user.signupSuccess,
    });
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
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
      user,
    } = this.props;
    const { errors, userConfirmedEmail, signupSuccess } = this.state;
    return (
      <Fragment>
        <Card className={classes.formCard}>
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
              {console.log(errors)}
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

                  <Button
                    variant="contained"
                    className={classes.button}
                    href="https://discord.com/api/oauth2/authorize?client_id=810033129452601364&redirect_uri=https%3A%2F%2Fhwbounty.help%2Fdoauth&response_type=token&scope=email%20identify"
                  >
                    Sign in with Discord
                  </Button>
                  <br />
                  <Button variant="contained" className={classes.button}>
                    Sign in with Google
                  </Button>
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
                    />
                    <TextField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      className={classes.textField}
                      error={errors.firstName ? true : false}
                      value={this.state.firstName}
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      className={classes.textField}
                      error={errors.lastName ? true : false}
                      value={this.state.lastName}
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      id="username"
                      name="username"
                      type="text"
                      label="Username"
                      className={classes.textField}
                      helperText={errors.username}
                      error={errors.username ? true : false}
                      value={this.state.username}
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
              <br />
              <small>
                Already have an account ? login <Link to="/login">here</Link>
              </small>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Card>
        <Dialog open={signupSuccess}>
          <DialogTitle id="signup-verification-prompt">
            Signup Success!
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Thanks for signing up! In order to make sure you not a bot, we
              sent you a verification email. You may close this tab{" "}
              <Link to="oops, we are still working on this">
                Click to resend the link
              </Link>
            </Typography>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupSuccess: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  signupSuccess: state.signupSuccess,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
