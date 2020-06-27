import React, { Component } from "react";
import { auth, database, citiesRef } from "../firebase";
class SignnUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailSignUp: "",
      MatriucleSignUp: "",
      PasswordSignUp: ""
    };
  }
  Addtofirebase() {
    database.ref(`Profs/${this.state.MatriucleSignUp}`).once("value", user => {
      console.log(user.val());
      if (user.exists()) {
        console.log("exist!", user.val());
        database
          .ref(`ComptesProfs/${this.state.MatriucleSignUp}`)
          .once("value", snapshot => {
            if (snapshot.exists()) {
              console.log("ce matricule exist deja");
            } else {
              auth
                .createUserWithEmailAndPassword(
                  this.state.EmailSignUp,
                  this.state.PasswordSignUp
                )
                .then(err => {
                  database
                    .ref(`ComptesProfs/${this.state.MatriucleSignUp}`)
                    .set({
                      matricule: this.state.MatriucleSignUp,
                      nom: user.val().nom,
                      prenom: user.val().prenom
                    });
                });
              citiesRef.doc(`${this.state.MatriucleSignUp}`).set({
                name: user.val().nom,
                prenom: user.val().prenom,
                email: this.state.EmailSignUp,
                matricule: this.state.MatriucleSignUp
              });
            }
          });
      } else {
        console.log("absent");
      }
    });
  }

  render() {
    const { EmailSignUp, MatriucleSignUp, PasswordSignUp } = this.state;
    return (
      <div class="sign-up-htm">
        <div class="group">
          <label for="user" class="label" style={{ marginBottom: 10 }}>
            Matriucle
          </label>
          <input
            type="text"
            class="input"
            value={MatriucleSignUp}
            onChange={event =>
              this.setState({ MatriucleSignUp: event.target.value })
            }
          />
        </div>

        <div class="group">
          <label for="pass" class="label" style={{ marginBottom: 10 }}>
            Email Address
          </label>
          <input
            type="text"
            class="input"
            value={EmailSignUp}
            onChange={event =>
              this.setState({ EmailSignUp: event.target.value })
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
            value={PasswordSignUp}
            onChange={event =>
              this.setState({ PasswordSignUp: event.target.value })
            }
          />
        </div>
        <div class="group">
          <input
            type="submit"
            class="button"
            style={{ marginTop: 30, fontSize: 20, fontWeight: 60 }}
            onClick={() => {
              this.Addtofirebase();
            }}
          />
        </div>

        <div class="hr"></div>
      </div>
    );
  }
}

export default SignnUp;
