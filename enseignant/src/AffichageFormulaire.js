import React, { Component } from "react";
import { database, auth } from "./firebase";
import "./AffichageFormulaire.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPowerOff,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Header from './Component/Header'

class AffichageFormulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ValeurDuFormulaireArechercheVote: "",
      TableauPourDenierPoint: [],
      TableauPourDenierPoint0: [],
      Votawyaw: false,
      QuestionFormulaire: [],
      ModuleFormulaire: [],
      riad: [],
    };
  }

  render() {
    const IdFormulaire = this.props.location.query.IdFormulaire;
    const PrivateKey = this.props.location.query.PrivateKey;
    return (
      <div className="jecpaspk">
        <Header></Header>
        <div className="RiadFlouw">
          <Button
            className="kunnn"
            animated="vertical"
            onClick={() => {
              let x = 0;
              console.log(x);
              //----------- Tableau de toutes les options des sous formulaire---------//
              database
                .ref("Formulaires/RSD/" + IdFormulaire + "/ContenuFormulaire")
                .once("value", (snap) => {
                  let y = [];
                  let Waty = [];
                  let Watz = [];
                  snap.forEach((item) => {
                    x++;

                    console.log(item.val());
                    y.push(item.val().Options);
                    Waty.push(item.val().Question);
                    Watz.push(item.val().NomModule);
                  });
                  console.log(y);
                  this.setState({
                    TableauPourDenierPoint: y,
                    QuestionFormulaire: Waty,
                    ModuleFormulaire: Watz,
                  });
                  let tableauessai = [];
                  y.map((obj) => {
                    var intermediare = [];
                    obj.map((obje2) => {
                      intermediare.push(0);
                    });
                    tableauessai.push(intermediare);
                  });
                  console.log(tableauessai);
                  this.setState({
                    TableauPourDenierPoint0: tableauessai,
                  });
                });
              //---------------------------------------------------------------------//
              database
                .ref("Formulaires/RSD/" + IdFormulaire + "/Matricule")
                .on("value", (snapshot) => {
                  const tab = Object.keys(snapshot.val());
                  console.log("a", tab);
                  tab.map((element) => {
                    console.log(element);
                    database
                      .ref(
                        "Formulaires/RSD/" +
                          IdFormulaire +
                          "/Matricule/" +
                          element +
                          "/vote"
                      )
                      .on("value", (snapshot) => {
                        console.log("important frr", snapshot.val());
                        if (snapshot.val() === true) {
                          database
                            .ref(
                              "Formulaires/RSD/" +
                                IdFormulaire +
                                "/Matricule/" +
                                element +
                                "/choix"
                            )
                            .once("value", (snapshot) => {
                              console.log(snapshot.val());
                              let x = snapshot.val();
                              let tableauPourDenierPoint = this.state
                                .TableauPourDenierPoint;

                              let tableauPourDenierPoint0 = this.state
                                .TableauPourDenierPoint0;
                              x.map((choixEtudiant) => {
                                console.log("choix", choixEtudiant);
                                //----------------Decrypt ----------------//
                                const ObjectADecrypter = {
                                  Key: PrivateKey,
                                  MessageADecrypter: choixEtudiant,
                                };
                                axios
                                  .post(
                                    "https://backend.e-cop.digital/RSA/decrypt",
                                    ObjectADecrypter
                                  )
                                  .then((res) => {
                                    let Le_Comparable = res.data.MessageClair;
                                    console.log("le comparable", Le_Comparable);
                                    let tableauwat =
                                      tableauPourDenierPoint[
                                        x.indexOf(choixEtudiant)
                                      ];
                                    tableauwat.map((val) => {
                                      if (val === Le_Comparable) {
                                        let u = tableauwat.indexOf(val);
                                        let o = x.indexOf(choixEtudiant);
                                        tableauPourDenierPoint0[o][u] =
                                          tableauPourDenierPoint0[o][u] + 1;
                                      }
                                      console.log(tableauPourDenierPoint0);
                                      this.setState({
                                        TableauPourDenierPoint0: tableauPourDenierPoint0,
                                        Votawyaw: true,
                                      });
                                    });
                                  });

                                //----------------------------------------//
                              });
                            });
                        }
                      });
                  });
                });

              //--------------------------------------------------------------------------//

              //---------------------------------------------------------------------//

              //------------------------------------------
              /*  database
                .ref(
                  "Formulaires/SSI/" +
                    this.state.ValeurDuFormulaireArechercheVote +
                    "/161632005185/Choix/"
                )
                .on();*/
            }}
          >
            <Button.Content visible>Consulter les resultats</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow down" />
            </Button.Content>
          </Button>
        </div>
        
        {this.state.Votawyaw && (
          <div>
            {this.state.TableauPourDenierPoint.map((obj, index) => {
              let xd = this.state.TableauPourDenierPoint0;
              console.log(xd);
              let xs = this.state.QuestionFormulaire;
              let xss = this.state.ModuleFormulaire;
              let xsss = this.state.TableauPourDenierPoint;
              return (
                <div className="container_formulaire_heaad">
                  <text className="NomDuModule"> Nom Module : {xss[index]}</text>
                  <text className="Question"> Question : {xs[index]}</text>
                  
                  {obj.map(function (n, index2) {
                    //console.log(this.state.TableauPourDenierPoint0[0][0]);
                    return (
                      <div style={{ marginBottom: 10 }}>
                        <text className="optionsjsss">
                          {" "}
                          Option {xsss[index][index2]}:
                        </text>
                        <text className="optionsjsss2">
                          {" "}
                          {xd[index][index2]} vote(s)
                        </text>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default AffichageFormulaire;
