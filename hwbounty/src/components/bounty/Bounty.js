import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// import MyButton from "../../util/MyButton";
import DeleteBounty from "./DeleteBounty";
import BountyDialog from "./BountyDialog";
import LikeButton from "./LikeButton";
import BountyReward from "./BountyReward";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  pointBounty: {},
};

class Bounty extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      bounty: {
        body,
        createdAt,
        userImage,
        userHandle,
        bountyId,
        likeCount,
        commentCount,
        pointReward,
        claimed,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteBounty bountyId={bountyId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
            <BountyReward pointReward={pointReward} claimed={claimed} />
          </div>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {" "}
            {/*This is were to put the no wrap if needed...*/}
            {body}
          </Typography>
          <LikeButton bountyId={bountyId} />
          <span>{likeCount} Likes</span>
          {/* <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton> */}
          <span>{commentCount} Comments</span>
          <BountyDialog
            bountyId={bountyId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Bounty.propTypes = {
  user: PropTypes.object.isRequired,
  bounty: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Bounty));
