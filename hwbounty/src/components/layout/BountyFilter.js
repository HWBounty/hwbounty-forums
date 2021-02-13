// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

export class BountyFilter extends Component {
  state = {
    gradeFilter: null,
    subjectFilter: null,
  };

  render() {
    const handleChange = (event) => {
      const name = event.target.name;
      this.setState({
        ...this.state,

        [name]: event.target.value,
      });
    };

    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="grade-filter">Grade</InputLabel>
          <Select
            native
            value={this.state.gradeFilter}
            onChange={handleChange}
            inputProps={{ name: "Grade", id: "grade-filter" }}
          >
            <option aria-label="None" value="" />
          </Select>
        </FormControl>
      </div>
    );
  }
}

BountyFilter.propTypes = {};

export default BountyFilter;
