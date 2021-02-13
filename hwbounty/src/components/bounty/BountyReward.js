import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  ...theme.spreadIt,
  reward: {
    color: theme.spreadIt.points.color,
    position: "absolute",
    left: "50%",
  },
});

export class BountyReward extends Component {
  render() {
    const { pointReward, claimed, classes } = this.props;

    const bountyReward = claimed ? (
      [claimed]
    ) : (
      <Typography variant="h6" align="right" className={classes.reward}>
        <Box fontWeight={pointReward} m={1}>
          {pointReward} Points
        </Box>
      </Typography>
    );

    return bountyReward;
  }
}

BountyReward.propTypes = {
  pointReward: PropTypes.number.isRequired,
  claimed: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BountyReward);
