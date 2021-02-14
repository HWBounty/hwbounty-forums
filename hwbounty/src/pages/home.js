import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Bounty from "../components/bounty/Bounty";
import Profile from "../components/profile/Profile";
import BountyFilter from "../components/layout/BountyFilter";

import BountySkeleton from "../util/BountySkeleton";

import { connect } from "react-redux";
import { getBounties, getFakeBounties } from "../redux/actions/dataActions";

export class home extends Component {
  state = {
    bounties: null,
  };

  componentDidMount() {
    this.props.getFakeBounties(); // TODO: TURN INTO GET REAL BOUNTIES
  }
  render() {
    const { bounties, loading } = this.props.data;
    let recentBountiesMarkup = !loading ? (
      bounties.map((bounty) => <Bounty key={bounty.bountyId} bounty={bounty} />)
    ) : (
      <BountySkeleton />
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={12} xs={12}>
          <BountyFilter />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentBountiesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getBounties: PropTypes.func.isRequired,
  getFakeBounties: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getBounties, getFakeBounties })(home);
