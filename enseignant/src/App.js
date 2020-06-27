import React, { Component } from "react";
import "./App.css";
import First from "./Component/Fist";
import HomeProfs from "./HomeProfs";
import { auth, database, firestore } from "./firebase";
import Formulairee from "./Fumulairee";
import Formulaire2 from "./Formulaire2";
import PageAccueilProf from "./PageAccueilProf";
import Body from "./component/Body";
import AffichageFormulaire from "./AffichageFormulaire";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AffichageFormulaire2 from "./AffichageFormulaire2";



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
        console.log(CurrentUser.email);

        console.log("Auth_Changed", CurrentUser.email);
        var a = firestore
          .collection("profs")
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
        console.log("watt");
      }
    });
  }
  
  render() {
    const { CurrentUser } = this.state;
    return (
	<Router>
        <div>
          <Switch>
            {!CurrentUser && <Route exact path="/" component={First} />}
            {CurrentUser && (
              <Route
                exact
                path="/Home"
                component={() => <PageAccueilProf CurrentUser={CurrentUser} />}
              />
            )}
            {CurrentUser && (
              <Route path="/Home2" exact component={AffichageFormulaire} />
            )}
            {CurrentUser && (
              <Route
                exact
                path="/AjouterFormulaire"
                component={() => <Formulaire2 CurrentUser={CurrentUser} />}
              />
            )}
            {CurrentUser && (
              <Route
                path="/RechercherFormulaire"
                exact
                component={AffichageFormulaire2}
              />
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
/*
    {
    /*   {!CurrentUser && <First />}
  {CurrentUser && (
    <Formulaire2
      CurrentUser={CurrentUser}
      IdFormulaire={Math.random().toString(36).substr(2, 9)}
    />
  )}
  }*/

/*
 <Router>
        <div>
          <Switch>
            {!CurrentUser && <Route exact path="" component={First} />}
            {CurrentUser && (
              <Route
                exact
                path="/Home"
                component={() => (
                  <Formulaire2
                    CurrentUser={CurrentUser}
                    IdFormulaire={Math.random().toString(36).substr(2, 9)}
                  />
                )}
              />
            )}
            {CurrentUser && (
              <Route path="/Home2" exact component={AffichageFormulaire} />
            )}
          </Switch>
        </div>
      </Router>
  */
