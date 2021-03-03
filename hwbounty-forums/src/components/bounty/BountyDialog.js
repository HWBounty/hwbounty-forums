import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TooltipButton from "../../util/TooltipButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//Redux Stuff
import { connect } from "react-redux";
import { getBounty, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "80%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class BountyDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, bountyId } = this.props;
    const newPath = `/users/${userHandle}/bounty/${bountyId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getBounty(this.props.bountyId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      bounty: {
        bountyId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton bountyId={bountyId} />
          <span>{likeCount} likes</span>
          <TooltipButton tip="comments">
            <ChatIcon color="primary" />
          </TooltipButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm bountyId={bountyId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <TooltipButton
          onClick={this.handleOpen}
          tip="Expand Bounty"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <TooltipButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </TooltipButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

BountyDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getBounty: PropTypes.func.isRequired,
  bountyId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  bounty: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bounty: state.data.bounty,
  UI: state.UI,
});

const mapActionsToProps = {
  getBounty,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(BountyDialog));
