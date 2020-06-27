import React, { Component } from "react";
import "../App.css";
import { database, auth } from "../firebase";
import { Route, Link } from "react-router-dom";
import Home from "../Home";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.FirebaseRef = database.ref("/Restaurant");
  }
  Addtofirebase() {
    auth
      .signInWithEmailAndPassword(this.state.name, this.state.password)
      .then(() => {
        console.log("here ypu are");
      });
  }

  render() {
    const { name, password } = this.state;
    return (
      <div className="form-container sign-in-container">
	<div className="watwat">
          <h1>Sign in</h1>
          <input
            type="text"
            value={name}
            onChange={(event) => this.setState({ name: event.target.value })}
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
              auth
                .signInWithEmailAndPassword(
                  this.state.name,
                  this.state.password
                )
                .then(() => {
                  console.log("here ypu are");
                });
            }}
          >
            {" "}
            Login
          </button>

          <span>or use your account</span>

          <button
            onClick={() => {
              var msg = document.getElementById("msg");
              msg.innerHTML = "<h4> Passer votre carte sur le lecteur </h4>";
              var allowed_students = [];

              var triesRef = database.ref("tries");
              var usersRef = database.ref("CartesEtudiants");

              usersRef.once("value", (snap) => {
                snap.forEach((item) => {
                  allowed_students.push(item.val());
                });
              });

              triesRef.on("value", (snap) => {
                if (snap.val() != null) {
                  var try_ = snap.val();
                  var try_nom = try_.nom;
                  var try_prenom = try_.prenom;
                  var try_email = try_.email;
                  var try_matricule = try_.matricule;
                  var try_password = try_.password;
                  var try_tag = try_.tag_id;

                  var found = false;
                  if (try_tag != "") {
                    var e = {
                      email: try_email,
                      matricule: try_matricule,
                      nom: try_nom,
                      password: try_password,
                      prenom: try_prenom,
                      tag_id: try_tag,
                    };
                    console.log(e);

                    for (var i = 0; i < allowed_students.length; i++) {
                      if (
                        JSON.stringify(allowed_students[i]) == JSON.stringify(e)
                      ) {
                        found = true;
                        console.log(allowed_students[i]);
                      }
                    }
                    console.log(try_email);
                    console.log(try_password);
                    if (found == true) {
                      msg.innerHTML =
                        "<h4> Success, you will be redirected in 5 seconds ... </h4>";
                      setTimeout(() => {
                        auth
                          .signInWithEmailAndPassword(try_email, try_password)
                          .then(() => {
                            console.log("here ypu are");
                          });
                      }, 5000);
                    } else {
                      msg.innerHTML = "<h4> ACCESS DENIED </h4>";
                    }
                  }
                }
              });
            }}
          >
            {" "}
            S'authentifier avec SmartCard
          </button>
          <div id="msg"></div>
        </div>
      </div>
    );
  }
}

export default SignIn;
