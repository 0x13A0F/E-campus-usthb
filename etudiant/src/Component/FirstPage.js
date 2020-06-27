import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Animation from "./Animation";
import "./test.css";
class FirstPage extends Component {
  state = {};
  render() {
    return (
      <div className="body">
        <div className="container" id="container">
          <SignIn />
          <SignUp />
          <Animation />
        </div>
      </div>
    );
  }
}

export default FirstPage;
