import React, { Component } from "react";
import { fire } from "../firebase";
import { database, auth, citiesRef, firestore } from "../firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      matricule: "",
    };
  }
  Addtofirebase() {
    database.ref(`Etudiant/${this.state.matricule}`).once("value", (user) => {
      if (user.exists()) {
        console.log("exist!", user.val());
        database
          .ref(
            `ComptesEtudiants/${user.val().specialite}/${this.state.matricule}`
          )
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              console.log("ce matricule exist deja");
            } else {
              auth
                .createUserWithEmailAndPassword(
                  this.state.name,
                  this.state.password
                )
                .then((err) => {
                  database
                    .ref(
                      `ComptesEtudiants/${user.val().specialite}/${
                        this.state.matricule
                      }`
                    )
                    .set({
                      matricule: this.state.matricule,
                      nom: user.val().nom,
                      prenom: user.val().prenom,
                    });
                });
              citiesRef.doc(`${this.state.matricule}`).set({
                name: user.val().nom,
                prenom: user.val().prenom,
                email: this.state.name,
                matricule: this.state.matricule,
                specialite: user.val().specialite,
              });
            }
          });
      } else {
        console.log("absent");
      }
    });
  }
  render() {
    const { name, password, matricule } = this.state;

    return (
      <div className="form-container sign-up-container">
        <div className="watwat">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            value={name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <input
            type="text"
            value={matricule}
            onChange={(event) =>
              this.setState({ matricule: event.target.value })
            }
          />
          <input
            type="password"
            value={password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <button
            onClick={() => {
              this.Addtofirebase();
            }}
          >
            {" "}
            add to firebase
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
