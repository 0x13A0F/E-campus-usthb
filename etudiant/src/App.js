import React, { Component } from "react";
import FirstPage from "./Component/FirstPage";
import "./App.css";
import Home from "./Home";
import { auth, citiesRef, firestore } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentUser: null,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((CurrentUser) => {
      if (CurrentUser) {
        console.log("Auth_Changed", CurrentUser.email);
        var a = firestore
          .collection("users")
          .where("email", "==", CurrentUser.email)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              console.log(doc.data());
              let x = doc.data();
              console.log("x", x);
              this.setState({ CurrentUser: x });
            });
          });
      } else {
        this.setState({ CurrentUser });
      }
    });
  }

  render() {
    const { CurrentUser } = this.state;
    return (
      <div>
        {!CurrentUser && <FirstPage />}
        {CurrentUser && <Home CurrentUser={CurrentUser} />}
      </div>
    );
  }
}
export default App;

/*
         {!CurrentUser && <FirstPage />}
        {CurrentUser && <Home CurrentUser={CurrentUser} />}
      */
