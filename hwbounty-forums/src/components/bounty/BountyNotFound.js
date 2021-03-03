// React
import React, { Component } from "react";

// Styling
import { Button } from "@material-ui/core";

export class BountyNotFound extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Invalid bounty </h1> <br />
          <p>Maybe it was deleted or there was a typo. </p>
          <a className="App-link" href="/">
            <Button variant="outlined">Return to home</Button>
          </a>
        </header>
      </div>
    );
  }
}

export default BountyNotFound;
