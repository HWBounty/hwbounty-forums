import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// Redux stuff
import { connect } from "react-redux";
import { postBounty } from "../../redux/actions/dataActions";

// MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "absolute",
    right: "82%",
    bottom: "10%",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
  pointReward: {
    position: "relative",
    left: "75%",
    marginBottom: "10px",
    width: "25%",
    size: "small",
  },
});

class PostBounty extends Component {
  state = {
    open: false,
    body: "",
    pointReward: null,
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
      this.handleClose();
    }
  }
  handleBountyChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postBounty({
      body: this.state.body,
      pointReward: this.state.pointReward,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Bounty!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Bounty</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post!"
                multiline
                rows="2"
                placeholder="Post your problem or question here..."
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <div style={{ marginTop: "30px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  Submit
                  {loading && (
                    <CircularProgress
                      size={30}
                      className={classes.progressSpinner}
                    />
                  )}
                </Button>
                <TextField
                  name="pointReward"
                  id="pointReward"
                  type="number"
                  label="Bounty"
                  variant="outlined"
                  error={errors.pointReward ? true : false}
                  helperText={errors.pointReward}
                  className={classes.pointReward}
                  onChange={this.handleBountyChange}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostBounty.propTypes = {
  postBounty: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postBounty })(
  withStyles(styles)(PostBounty)
);
