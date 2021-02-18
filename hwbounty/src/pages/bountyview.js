// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.ico";

//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

// Utils
import expandLabel, { compactLabel } from "../util/expandLabel";

// Components
import BountyNotFound from "../components/bounty/BountyNotFound";
import BountyReward from "../components/bounty/BountyReward";
import Comment from "../components/bounty/Comment";

// Redux
import { submitComment, getBounty } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import { List } from "@material-ui/core";

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
  },
  comment: {
    paddingLeft: 10,
    paddingBottom: 5,
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  }
});

const sortComments = (comments) => {
  let replySorted = {};
  let nonReplies = [];
  for(var i = 0; i < comments.length; i++){
    if(comments[i].parentCommentID){
      if(replySorted[comments[i].parentCommentID]) {
        replySorted[comments[i].parentCommentID].push(comments[i]);
      } else {
        replySorted[comments[i].parentCommentID] = [comments[i]];
      }
    } else {
      nonReplies.push(comments[i]);
    }
  }

  let final = nonReplies;
  for(var i = 0; i < nonReplies.length; i++){
    if(replySorted[nonReplies[i].commentID]) { 
      final.splice(i + 1, 0, replySorted[nonReplies[i].commentID]);
    }
  }

  final = [].concat.apply([], final);
  console.log(final);
  return final;
}


export class bountyview extends Component {
  state = {
    valid: true,
    comment: "", // what the user is writing now
  }

  componentDidMount = () => {
    const bountyID = this.props.match.params.bountyID;
    this.props.getBounty(bountyID);
  };

  handleCommentChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.data.bounty.bountyID, { comment: this.state.comment });
  };

  render() {
    const { classes, data: { bounty }, UI: { loading } } = this.props;
    
    let tags = (bounty.tags && (
      <span>
        <span>Topics:</span> <br />
        {bounty.tags.split(",").map((l, i) => {
          return (
            <span style={{paddingRight: 5}}>
              <Chip
                label={expandLabel(l)[0]}
                style={expandLabel(l)[1]}
                component="a"
                href={"/?t=" + compactLabel(l[0])}
                clickable
                key={l}
              />
            </span>
          );
        })}{" "}
        <br /> <br />
      </span>
    ))

    let comments = (bounty.comments && sortComments(bounty.comments).map((c, i) => (
      <Comment comment={c} key={c.commentID} />
    )))

    return (
      <div className={classes.rootPadding}>
        {loading ? (<CircularProgress size={200} thickness={2} className={classes.loading} />) : (bounty.valid ? (
          <span>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label={bounty.author.publicID}
                        src={bounty.author.pfp}
                      />
                    }
                    title={bounty.title}
                    subheader={"Posted by: " + bounty.author.publicID}
                  />
                  <CardContent>
                    {tags}

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {bounty.description && bounty.description.split("\n").map((l, i) => {
                        return (
                          <span id={i} key={i}>
                            {l}
                            <br />
                          </span>
                        );
                      })}
                    </Typography>
                    <BountyReward
                      pointReward={bounty.points}
                      claimed={bounty.claimed}
                    />
                  </CardContent>{" "}
                  <br /> <br />
                  <form onSubmit={this.handleCommentSubmit}>
                    <CardActions disableSpacing>
                      <TextField
                        name="comment"
                        type="text"
                        label="Put your answer/comment here..."
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        autoComplete="off"
                        fullWidth
                        onChange={this.handleCommentChanged}
                      />
                      <IconButton type="submit">
                        <SendIcon color="primary" />
                      </IconButton>
                    </CardActions>
                  </form>
                </Card>
              </Grid>
              {comments}
            </Grid>
          </span>
        ) : (
            <BountyNotFound />))}
      </div>
    );
  }
}

bountyview.propTypes = {
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  getBounty: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

export default connect(mapStateToProps, { submitComment, getBounty })(
  withStyles(styles)(bountyview)
);
