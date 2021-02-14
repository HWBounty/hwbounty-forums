import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import TooltipButton from "../../util/TooltipButton";
import DeleteBounty from "./DeleteBounty";
import BountyDialog from "./BountyDialog";
import LikeButton from "./LikeButton";
import BountyReward from "./BountyReward";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

// Labels
import expandLabel from "../../util/expandLabel";
import { compactLabel } from "../../util/expandLabel";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    maxWidth: 170,
    float: 'left',
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  pointBounty: {},
  avatar: {
    width: 25,
    height: 25,
  },
  username: {
    paddingLeft: 10,
  },
};

class Bounty extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      bounty: {
        createdAt,
        bountyID,
        likeCount,
        commentCount,
        points,
        claimed,
        author,
        title,
        description,
        tags,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && author.publicID === handle ? (
        <DeleteBounty bountyId={bountyID} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={(e) => {this.props.history.push("/bountyview/" + bountyID)}}>
          <CardContent className={classes.content}>
            <div style={{ display: "flex" }}>
              <Avatar
                src={author.pfp}
                className={classes.avatar}
              />
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${author.publicID}`}
                color="primary"
                className={classes.username}
              >
                {author.publicID}
              </Typography>
              <BountyReward pointReward={points} claimed={claimed} />
            </div>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">
              {" "}
              {/*This is were to put the no wrap if needed...*/}
              <h2>
                {title}
              </h2>
            </Typography>
            <Typography variant="body1" noWrap={true}>
              {" "}
              {/*This is were to put the no wrap if needed...*/}
              {description}
            </Typography>
            {tags.split(",").map((l, i) => {
                return(expandLabel(l)); 
              }).map((l, i) => {
                return (
                  <Chip
                    label={l[0]}
                    style={l[1]}
                    component="a"
                    href={"/?t=" + compactLabel(l[0])}
                    clickable
                  />
                );
              })}
            <LikeButton bountyId={bountyID} />
            <span>{likeCount} Likes</span>
            <TooltipButton tip="comments">
              <ChatIcon color="primary" />
            </TooltipButton>
            <span>{commentCount} Comments</span>
            <BountyDialog
              bountyId={bountyID}
              userHandle={author.publicID}
              openDialog={this.props.openDialog}
            />
          </CardContent>
        </CardActionArea>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Bounty)));
