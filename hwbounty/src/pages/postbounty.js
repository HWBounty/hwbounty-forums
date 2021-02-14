import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TooltipButton from "../util/TooltipButton";

// Redux stuff
import { connect } from "react-redux";
import { postBounty } from "../redux/actions/dataActions";

// MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadIt,
  pageTitle: {
    ...theme.spreadIt.pageTitle,
  },
  titleTextField: {
    fontSize: "2em",
  },
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
      <div className={classes.rootPadding}>
        <Typography variant="h2" className={classes.pageTitle}>
          Post a bounty!
        </Typography>
        <TextField
          id="bounty-title"
          label="Title"
          type="text"
          variant="outlined"
          InputProps={{ classes: { input: classes.titleTextField } }}
        />
      </div>
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
