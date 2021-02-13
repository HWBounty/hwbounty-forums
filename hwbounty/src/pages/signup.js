// React
import React, { Component } from "react";

// Styling
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

// Requests
import axios from 'axios'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// Redux
import { connect } from "react-redux";

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameValidated: true,
        };
    }

    
    validateUsername = (e) => {
        axios.get("https://api.hwbounty.help/usernametaken/" + e.target.value)
            .then(res_obj => {
                console.log(res_obj);
                this.setState({ userNameValidated: (res_obj.status == 200 ? !res_obj.data : false) });
            })
            .then(console.log(this.state))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <br /> <br />
                    <TextField id="outlined-basic" label="Username" error={!this.state.userNameValidated} helperText={(!this.state.userNameValidated ? "The username is too short/taken" : "")}/> <br /> 
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

                    <Button variant="outlined" onClick={this.validateUsername}>Sign up with Google</Button>
                </header>
            </div>
        );
    }
}

export default Signup;
