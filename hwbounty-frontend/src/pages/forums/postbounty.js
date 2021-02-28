import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TooltipButton from "../../util/TooltipButton";
import AppIcon from "../../images/HWBounty-Logo.png";

// Redux stuff
import { connect } from "react-redux";
import { postBounty } from "../../redux/actions/dataActions";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { compactLabel, labels } from "../../util/expandLabel";

const styles = (theme) => ({
  ...theme.spreadIt,
  pageTitle: {
    ...theme.spreadIt.pageTitle,
    float: "left",
    paddingTop: 15,
  },
  image: {
    ...theme.spreadIt.image,
    float: "right",
    maxWidth: "10%",
    paddingRight: "6.5%",
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
    width: "35%",
    size: "small",
  },
  titleField: {
    margin: "15px auto 15px auto",
    width: "50%",
    paddingRight: "2%",
  },
  numberField: {
    margin: "15px auto 15px auto",
    width: "23%",
  },
  formCard: {
    ...theme.spreadIt.formCard,
    padding: "40px 60px",
  },
  button: {
    ...theme.spreadIt.button,
    minWidth: "23%",
    float: "right",
  },
});

class PostBounty extends Component {
  state = {
    title: "",
    body: "",
    points: 0,
    ppoints: 0,
    tags: "",
    errors: {
      tags: "You need at least one tag.",
    },
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
      this.props.history.push("/");
    }
  }
  handleBountyChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };
  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleTagChange = (event, value) => {
    if (value.length == 0) {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          tags: "You need at least one tag.",
        },
      });
      return;
    }
    console.log(value.map((i, e) => compactLabel(i.title)).join(","));
    this.setState({
      ...this.state,
      tags: value.map((i, e) => compactLabel(i.title)).join(","),
      errors: {
        ...this.state.errors,
        tags: null,
      },
    });
  };
  handleSubmit = (event) => {
    if (this.state.errors.tags != null) {
      return;
    }

    event.preventDefault();
    this.props.postBounty({
      title: this.state.title,
      body: this.state.body,
      points: this.state.points,
      ppoints: this.state.ppoints,
      tags: this.state.tags,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Card className={classes.formCard}>
        <Grid container className={classes.form}>
          <Grid item sm>
            <Typography variant="h4" className={classes.pageTitle}>
              Post a bounty
            </Typography>
            <img src={AppIcon} alt="hwbounty logo" className={classes.image} />{" "}
            <br /> <br /> <br /> <br /> <br /> <br />
            <TextField
              name="title"
              type="title"
              label="Title"
              className={classes.titleField}
              error={errors.title ? true : false}
              helperText={errors.title}
              variant="outlined"
              onChange={this.handleTextChange}
            />
            <TextField
              name="points"
              type="number"
              label="Points"
              className={classes.numberField}
              error={errors.points ? true : false}
              helperText={errors.points}
              variant="outlined"
              style={{ paddingRight: "2%" }}
              onChange={this.handleBountyChange}
            />
            <TextField
              name="ppoints"
              type="number"
              label="Premium Points"
              variant="outlined"
              className={classes.numberField}
              error={errors.ppoints ? true : false}
              helperText={errors.ppoints}
              onChange={this.handleBountyChange}
            />{" "}
            <br />
            <TextField
              name="body"
              type="text"
              label="Body"
              multiline
              rows={18}
              variant="outlined"
              onChange={this.handleTextChange}
              error={errors.body ? true : false}
              helperText={errors.body}
              style={{ paddingBottom: "2%" }}
              fullWidth
            />{" "}
            <Autocomplete
              multiple
              id="tags-outlined"
              options={labels.map((i, e) => {
                return { title: i };
              })}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={this.handleTagChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  error={errors.tags ? true : false}
                  helperText={errors.tags}
                />
              )}
            />
            <br />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
              onClick={this.handleSubmit}
            >
              Post
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
          </Grid>
        </Grid>
      </Card>
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

export default withRouter(
  connect(mapStateToProps, { postBounty })(withStyles(styles)(PostBounty))
);
