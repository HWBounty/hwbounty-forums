// React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// MUI
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import theme from "../../util/theme";
import { withStyles } from "@material-ui/core";

import { compactLabel } from "../../util/expandLabel"

const styles = {
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
};

export class BountyFilter extends Component {
  state = {
    gradeFilter: null,
    subjectFilter: null,
    subjects: ["Math", "Science", "History", "English", "Spanish", "Computer Science", "Japanese", "Chinese"],
  };

  render() {
    const { classes } = this.props;

    const handleChange = (event) => {
      this.props.history.push("/?t=" + compactLabel(event.target.value));
      window.location.reload(false);
    };

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grade-filter">Grade</InputLabel>
          <Select
            native
            value={this.state.gradeFilter}
            onChange={handleChange}
            inputProps={{ name: "Grade", id: "grade-filter" }}
          >
            <option aria-label="None" value="" />
            <option value={9}>9th</option>
            <option value={10}>10th</option>
            <option value={11}>11th</option>
            <option value={12}>12th</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="subject-filter">Subject</InputLabel>
          <Select
            native
            value={this.state.gradeFilter}
            onChange={handleChange}
            inputProps={{ name: "Subject", id: "subject-filter" }}
          >
            <option aria-label="None" value="" />
            {this.state.subjects.map((subject) => (
              <option value={subject}>{subject}</option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

BountyFilter.propTypes = {};

export default withRouter(withStyles(styles)(BountyFilter));
