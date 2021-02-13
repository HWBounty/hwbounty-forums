// React
import React, { Component } from "react";

// Styling
import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class PageNotFound extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        <h1> Invalid bounty </h1> <br/>
                        Maybe it was deleted or there was a typo.
                    </p>
                    <a className="App-link" href="/">
                        <Button variant="outlined">Return to home</Button>
                    </a>
                </header>
            </div>
        );
    }
}

export default PageNotFound;
