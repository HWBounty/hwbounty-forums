import React, { Component } from "react";

//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { submitComment } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    width: "50%",
    textAlign: "left",
    float: "left",
    paddingBottom: 1,
  },
  textField: {
    margin: "15px auto 15px auto",
    width: "100%",
  },
  points: {
    right: "10%",
  },
  answerCheck: {
    float: "right",
  },
  childComment: {
    width: "95%",
    float: "right",
    paddingLeft: 10,
    paddingBottom: 5,
    wordBreak: "break-all",
  },
  comment: {
    paddingLeft: 10,
    paddingBottom: 5,
    wordBreak: "break-all",
  },
});

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      reply: "", // what the user is writing now
    };
  }

  handleCommentChanged = (event) => {
    this.setState({ reply: event.target.value });
  };

  handleCommentReplySubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.comment.bountyID, { comment: this.state.reply, parentID: this.props.comment.commentID });
  };

  render() {
    dayjs.extend(relativeTime);
    const { classes, comment } = this.props;
    return (
      <Grid item xs={12}>
        <Card
          className={
            comment.parentCommentID != null
              ? classes.childComment
              : classes.comment
          }
        >
          <CardHeader
            avatar={
              <Avatar aria-label={comment.user.publicID} src={comment.user.pfp} />
            }
            title={"From: " + comment.user.publicID}
            subheader={dayjs(comment.timestamp).fromNow()}
            action={
              comment.parentCommentID === null ? (
                <IconButton className={classes.answerCheck}>
                  <CheckIcon color="disabled" />
                </IconButton>
              ) : null
            }
          />
          <Typography>
            {comment.comment}{" "}
            {comment.edited > 0 ? (
              <small style={{ color: "gray" }}>(edited)</small>
            ) : null}
          </Typography>
          {comment.parentCommentID != null ? null : (
            <span>
              {" "}
              <br />
              <form onSubmit={this.handleCommentReplySubmit}>
                <CardActions disableSpacing>
                  <TextField
                    name="reply"
                    type="reply"
                    label="Reply"
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    onChange={this.handleCommentChanged}
                    fullWidth
                  />
                  <IconButton type="submit">
                    <SendIcon color="primary" />
                  </IconButton>
                </CardActions>
              </form>
            </span>
          )}
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(Comment));