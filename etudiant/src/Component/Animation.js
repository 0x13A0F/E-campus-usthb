import React, { Component } from "react";

class Animation extends Component {
  fct1() {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  }
  fct2() {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  }
  render() {
    return (
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={this.fct2} className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button onClick={this.fct1} className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Animation;
