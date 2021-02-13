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
                        <h1> 404 Page not found </h1>
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
