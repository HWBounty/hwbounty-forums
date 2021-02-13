// React
import React, { Component } from "react";

// Styling
import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class Login extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <TextField id="outlined-basic" label="Username" /> <br /> 
                    <TextField id="outlined-basic" label="Password" type="password" /> <br /> 
                    <Button variant="contained" color="primary"> Login </Button> <br /> <br />

                    <Button variant="outlined">Log in with Google</Button>
                </header>
            </div>
        );
    }
}

export default Login;
