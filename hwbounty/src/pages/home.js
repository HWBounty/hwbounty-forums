import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Bounty from "../components/bounty/Bounty";
import Profile from "../components/profile/Profile";
import BountyFilter from "../components/layout/BountyFilter";

import BountySkeleton from "../util/BountySkeleton";

import { connect } from "react-redux";
import { getBounties, getFakeBounties } from "../redux/actions/dataActions";

function getQueryVariable(variable, querystring) {
  var query = querystring.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
}

export class home extends Component {
  state = {
    bounties: null,
  };

  componentDidMount() {
    console.log(getQueryVariable("t", this.props.location.search));
    this.props.getBounties((getQueryVariable("t", this.props.location.search) ? getQueryVariable("t", this.props.location.search) + "?0?time" : "all?0?time"));
  }


  render() {
    const { bounties, loading } = this.props.data;
    let recentBountiesMarkup = !loading ? (
      bounties.map((bounty) => <Bounty key={bounty.bountyID} bounty={bounty} />)
    ) : (
      <BountySkeleton />
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={12} xs={12} >
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
