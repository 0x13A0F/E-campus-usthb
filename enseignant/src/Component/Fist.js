import React, { Component } from "react";
import "./First.css";
import SignnUp from "./SignnUp";
import SignIn from "./SignIn";
class First extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <div class="login-wrap">
          <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
            <label for="tab-1" class="tab" style={{ marginBottom: 30 }}>
              Sign In
            </label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" />
            <label for="tab-2" class="tab" style={{ marginBottom: 30 }}>
              Sign Up
            </label>
            <div class="login-form">
              <SignIn />
              <SignnUp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default First;
