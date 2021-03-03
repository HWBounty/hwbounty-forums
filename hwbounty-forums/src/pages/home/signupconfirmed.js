// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { getUserData } from "../../redux/actions/userActions";
import { connect } from "react-redux";

// Axios
import axios from "axios";

class signupconfirmed extends Component {
  state = {
    valid: false,
  };
  componentDidMount() {
    const DBIdToken = `Bearer ${this.props.match.params.token}`;
    console.log(DBIdToken);
    axios
      .get("/@me", { headers: { Authorization: DBIdToken } })
      .then((res) => {
        console.log("this is res");
        localStorage.setItem("DBIdToken", DBIdToken);
        axios.defaults.headers.common["Authorization"] = DBIdToken;
        this.props.getUserData();
        this.setState({ ...this.state, valid: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { valid } = this.state;
    return (
      <h1>
        {valid
          ? "Account confimration success! You may now proceed..."
          : "Something went wrong"}
      </h1>
    );
  }
}

signupconfirmed.propTypes = {
  getUserData: PropTypes.func.isRequired,
};

export default connect(null, { getUserData })(signupconfirmed);
