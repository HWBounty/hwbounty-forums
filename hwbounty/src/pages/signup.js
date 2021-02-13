// React
import React, { Component } from "react";

// Styling
import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class Signup extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <br /> <br />
                    <TextField id="outlined-basic" label="Username" /> <br /> 
                    <TextField id="outlined-basic" label="Email" /> <br /> 
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Confirm Password"
                        type="password"
                        onChange={this.handleConfirmChange}
                    />
                    <br /> 
                    <Button variant="contained" color="primary"> Sign up </Button> <br /> <br />

                    <Button variant="outlined">Sign up with Google</Button>
                </header>
            </div>
        );
    }
}

export default Signup;
