import React, { Component } from "react";
import { auth, firestore, databse } from "../firebase";
import { Link } from "react-router-dom";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailSignIn: "",
      PasswordSignIn: "",
    };
  }
  render() {
    const { EmailSignIn, PasswordSignIn } = this.state;
    return (
      <div class="sign-in-htm">
        <div class="group">
          <label for="user" class="label" style={{ marginBottom: 10 }}>
            Email
          </label>
          <input
            type="text"
            class="input"
            value={EmailSignIn}
            onChange={(event) =>
              this.setState({ EmailSignIn: event.target.value })
            }
          />
        </div>
        <div class="group">
          <label for="pass" class="label" style={{ marginBottom: 10 }}>
            Password
          </label>
          <input
            type="password"
            class="input"
            data-type="password"
            value={PasswordSignIn}
            onChange={(event) =>
              this.setState({ PasswordSignIn: event.target.value })
            }
          />
        </div>
        <div class="group">
          <input id="check" type="checkbox" class="check" checked />
        </div>
        <div class="group">
          <Link to="/Home">
            <input
              type="submit"
              class="button"
              value="Sign In"
              style={{ marginTop: 30, fontSize: 20, fontWeight: 60 }}
              onClick={() => {
                auth
                  .signInWithEmailAndPassword(
                    this.state.EmailSignIn,
                    this.state.PasswordSignIn
                  )
                  .then(() => {
                    console.log("here ypu are");
                  });
              }}
            />
          </Link>
          <center><span>or use your account</span></center>
          <button class="button">
            S'authentifier avec SmartCard
          </button>
        </div>
        <div class="hr"></div>
      </div>
    );
  }
}

export default SignIn;
