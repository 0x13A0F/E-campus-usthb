import React, { Component } from "react";
import "./Formulaire2.css";
import BorderWrapper from "react-border-wrapper";
import Fromulairee from "./Fumulairee";
import Formulairee from "./Fumulairee";
import { database, auth, db } from "./firebase";
import Wrapper from "./Component/DatePic";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Result, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import Header from "./Component/Header";

import AffichageFormulaire2 from "./AffichageFormulaire2";
import {
  faPlus,
  faPowerOff,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ElementFormulaire from "./component/ElementFormulaire";
import { TextField } from "@material-ui/core";

class Formulaire2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compteur: -1,
      Formulaire: [false, false, false, false, false],
      valeurSup: 0,
      newcompt: -1,
      option: "",
      Options: [],
      form: {
        Question: "",
        NomModule: "",
        Options: [],
      },
      tab: [],
      y: [],
      z: [],
      w: [],
      ky: 0,
      TableauOptions: [],
      ValeurDuFormulaireArechercheVote: "",
      TableauPourDenierPoint: [],
      TableauPourDenierPoint0: [],
      Votawyaw: false,
      QuestionFormulaire: [],
      ModuleFormulaire: [],
      selectedOption: null,
      tupeux: false,
      TitreDuFormulaire: "",
      SpecialiteDestine: [],
      PopUpActive: false,
      AffichageMessageSuccee: false,
      IdFormulaire: null,
    };
  }

  AddToDo() {
    // Ajout des options en poushant la valeur correspendante a la position key TableauOption( key etant la position du sous formulaire ) TableauOptions[key] : contient la valeur de l'option a ajouter dans w qui est le tableau de tableau d'options
    let key = this.state.ky;
    console.log("key" + this.state.ky);
    if (this.state.w.length < 6) {
      console.log(this.state.w);
      console.log(this.state.TableauOptions[key]);
      let Valeur = this.state.TableauOptions[key].option;
      let ww = this.state.w;
      ww[key].push(Valeur);
      console.log("ww", ww);
      let xr = this.state.TableauOptions;
      xr[key].option = "";
      event.preventDefault();
      this.setState({
        w: ww,
        TableauOptions: xr,
        valueFirebase: false,
      });
    }
  }
  renderTodo(key) {
    let wN = this.state.w;
    let ww = this.state.w[key];
    let xx = ww;
    return ww.map((item) => {
      return (
        <div key={item}>
          <input className="option" value={item} /> |{" "}
          <button
            className="supprimeroption"
            onClick={() => {
              const index = xx.indexOf(item);
              console.log(index);
              xx.splice(index, 1);
              wN[key] = xx;
              this.setState({
                w: wN,
              });
            }}
          >
            {" "}
            X
          </button>
        </div>
      );
    });
  }
  componentDidMount() {
    database.ref("ComptesProfs/1056/Specialité").on("value", (snapshpot) => {
      console.log("Les specialite", snapshpot.val());
      // console.log("diff", optionsS);
      let tab = this.state.SpecialiteDestine;
      tab.push(snapshpot.val());
      let Idfrm = Math.random().toString(36).substr(2, 9);
      this.setState({
        SpecialiteDestine: tab[0],
        AffichageMessageSuccee: false,
        IdFormulaire: Idfrm,
      });
    });
  }
  handleChange = (selectedOption) => {
    // Pour capturer la valeur entrer dans le select
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    //const IdFormulaire = this.props.IdFormulaire;
    const matriculeProf = this.props.CurrentUser.matricule;
    console.log(matriculeProf);
    const IdFormulaire = this.state.IdFormulaire;
    const { selectedOption } = this.state;
    return (
      <div className="englonbe">
        <Header></Header>
        <div className="body_wrapper">
          <div className="DivBorderWrape">
            <div className="InitialeDIvFormulaire" id="jamaisjamais">
              <div className="ouoouo">
                <p>
                  Bienvenu a la section Creation de formulaire.
                  <br />
                  <br /> Vous pouvez choisir le nom du formulaire et la date
                  limite de validite du formulaire ( Attention! : vous ne pouvez
                  pas consulter les resultats du formulaire avant la date
                  limite) . <br />
                  <br />
                  Vous pouvez anisi choisir la section pour lequelle ce
                  formulaire est destine
                </p>
              </div>
              <div className="zinversion2">
                <TextField
                  id="outlined-basic"
                  label="Titre du formulaire"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={this.state.TitreDuFormulaire}
                  onChange={(evt) => {
                    this.setState({ TitreDuFormulaire: evt.target.value });
                  }}
                />
                <h3> Sélectionner la date limite</h3>{" "}
                <Wrapper
                  IdFormulaire={IdFormulaire}
                  style={{ marginBottom: 10, width: "100%" }}
                />
                <div style={{ width: 400, marginTop: 20 }}>
                  <h3> Sélectionner la séction déstinée</h3>{" "}
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.SpecialiteDestine}
                    style={{ width: 100 }}
                  />
                </div>
                {
                  // <h2> IdFormulaire : Formulaire{this.props.IdFormulaire}</h2>
                }
                <br />
                <div>
                  <button
                    className="buttonSUppp"
                    onClick={() => {
                      let compteur = this.state.compteur;
                      let newcompt = this.state.newcompt;
                      let array = this.state.Formulaire;
                      array[compteur + 1] = true;

                      if (compteur < 10) {
                        this.setState({
                          compteur: compteur + 1,
                          newcompt: newcompt + 1,
                        });
                        this.setState({ Formulaire: array });
                      }
                      // Rapporter l'ancienne valeur du tab ( ou sont enregistrer les cases d'un formulaire vide)
                      let arrayy = this.state.tab;
                      // Rapporter l'ancienne valeur de y qui est un tableau ou sont enregistrer les valeurs des noms modules
                      let x = this.state.y;
                      // meme chose avec le tableau de question
                      let xx = this.state.z;
                      let xxx = this.state.w;
                      // tableau des options
                      let xxxx = this.state.TableauOptions;
                      // ajouter dans les tableau de modules et de question des instances vides
                      x.push("");
                      xx.push("");
                      xxx.push([]);
                      xxxx.push({ option: "" });
                      var Var = this.state.form;
                      // ajouter dans tab une instance vide D'un formulaire
                      arrayy.push({
                        Question: "",
                        NomModule: "",
                        Options: [],
                      });
                      // ----------------- Backend ---------------//

                      /* axios.get("https://backend.e-cop.digital/RSA/cle").then((res) => {
                        console.log(res.data);
                      }); //  console.log("1" + arrayy) */ this.setState(
                        {
                          tab: arrayy,
                          y: x,
                          z: xx,
                          TableauOptions: xxxx,
                          tupeux: true,
                          AffichageMessageSuccee: false,
                        }
                      );
                      document.getElementById("jamaisjamais").style.display =
                        "none";
                    }}
                  >
                    {" "}
                    Créer un formulaire
                  </button>
                </div>
              </div>
            </div>
            {this.state.AffichageMessageSuccee && (
              <Result
                status="success"
                title="Formulaire crée avec succès!"
                extra={[
                  <Link to="RechercherFormulaire">
                    <Button type="primary" key="console">
                      Consulter les resultats
                    </Button>
                  </Link>,
                ]}
              />
            )}

            {this.state.Formulaire.map((i, key) => {
              let array = this.state.Formulaire;
              //console.log(key);
              let x = array.indexOf(i);
              // console.log("a" + x);
              return (
                i && (
                  <div key={key} style={{ marginBottom: 40 }}>
                    <div className="dokTban">
                      <div className="RiadStyle">
                        <input
                          className="input"
                          placeholder=" Nom du module"
                          value={this.state.y[key]}
                          //  value={this.state.tab[key].NomModule}
                          onChange={(event) => {
                            console.log("la valeur que tu cherche " + key);
                            let array2 = this.state.y;
                            // console.log("y" + array2);
                            // ajouter la valeur ecrite du sous fourmulaire  de position key dans le tableau coorespendant ( nom module du sous formulaire 3 ==> tableauDesModule[3] = nouvelleValeurEntre )                            array2[key] = event.target.value;
                            array2[key] = event.target.value;

                            this.setState({ y: array2 });
                          }}
                        />
                        <br />
                        <textarea
                          className="textarea"
                          placeholder=" Ques
                    tion"
                          value={this.state.z[key]}
                          onChange={(event) => {
                            console.log(key);
                            let array2 = this.state.z;
                            // console.log("y" + array2);
                            // ajouter la valeur ecrite du sous fourmulaire  de position key dans le tableau coorespendant ( nom module du sous formulaire 3 ==> tableauDesModule[3] = nouvelleValeurEntre )                            array2[key] = event.target.value;

                            array2[key] = event.target.value;
                            this.setState({ z: array2 });

                            /*   let array = this.state.tab;
                      array[key].NomModule = event.target.value;
                      console.log(array[key].NomModule);
                      this.setState({ tab: array });*/
                          }}
                        />
                        <br />
                        <input
                          className="option"
                          placeholder=" option"
                          value={this.state.TableauOptions[key].option}
                          onChange={(event) => {
                            // Chaque sous formulaire est reférer par une case dans dans TableOptions pour la valeur de l'option
                            let tab = this.state.TableauOptions;
                            tab[key].option = event.target.value;
                            console.log("key init", key);
                            this.setState({ TableauOptions: tab, ky: key });
                          }}
                        />{" "}
                        <button
                          className="optionbutton"
                          onClick={this.AddToDo.bind(this)}
                        >
                          {" "}
                          Ajouter
                        </button>
                        <br />
                        <div>{this.renderTodo(key)}</div>
                      </div>
                      <div className="riadFo9">
                        <button
                          className="buttonSUpp"
                          onClick={() => {
                            // Pour chaque tableau d'element ou de tableau je supprime la case correspandante a l'index de la borderwraper supprimer
                            console.log(key);
                            //let w = array.indexOf(i);
                            //
                            array[key] = false;
                            let tableau = this.state.tab;
                            tableau.splice(key, 1);
                            let tableau2 = this.state.y;
                            console.log(tableau2);
                            tableau2.splice(key, 1);
                            console.log(tableau2);

                            let tableau3 = this.state.z;
                            tableau3.splice(key, 1);

                            let tableau4 = this.state.w;
                            tableau4.splice(key, 1);

                            let tableau5 = this.state.TableauOptions;
                            tableau5.splice(key, 1);

                            console.log("array" + array[key]);
                            array.splice(key, 1);
                            this.setState({
                              w: tableau4,
                              z: tableau3,
                              y: tableau2,
                              tab: tableau,
                              Formulaire: array,
                              compteur: this.state.compteur - 1,
                              TableauOptions: tableau5,
                            });
                          }}
                        >
                          supprimer
                        </button>{" "}
                        <button
                          className="buttonSUpp"
                          onClick={() => {
                            let compteur = this.state.compteur;
                            let newcompt = this.state.newcompt;
                            let array = this.state.Formulaire;
                            array[compteur + 1] = true;

                            if (compteur < 10) {
                              this.setState({
                                compteur: compteur + 1,
                                newcompt: newcompt + 1,
                              });
                              this.setState({ Formulaire: array });
                            }
                            let arrayy = this.state.tab;
                            let x = this.state.y;
                            let xx = this.state.z;
                            let xxx = this.state.w;
                            let xxxx = this.state.TableauOptions;
                            //  arrayinitiale[0].NomModule = "karim";

                            x.push("");
                            xx.push("");
                            xxx.push([]);
                            xxxx.push({ option: "" });
                            var Var = this.state.form;
                            arrayy.push({
                              Question: "",
                              NomModule: "",
                              Options: [],
                            });
                            //  console.log("1" + arrayy);
                            this.setState({
                              tab: arrayy,
                              y: x,
                              z: xx,
                              TableauOptions: xxxx,
                            });
                          }}
                        >
                          {" "}
                          ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
            {this.state.tab.length != 0 && (
              <div>
                <button
                  className="Souilah"
                  onClick={() => {
                    let arrayinitiale = this.state.tab;

                    let yy = this.state.y;
                    let zz = this.state.z;
                    let ww = this.state.w;
                    //  console.log("avant" + yy);
                    console.log("avant" + arrayinitiale);

                    arrayinitiale.map((element, key) => {
                      console.log("yy" + yy[key]);
                      let way = yy[key];
                      let wayway = zz[key];
                      let waywayway = ww[key];
                      console.log("element actuel" + way, key);
                      element.NomModule = way;
                      element.Question = wayway;
                      element.Options = waywayway;
                    });
                    console.log(arrayinitiale);
                    this.setState({
                      tab: arrayinitiale,
                    });
                    console.log("1", IdFormulaire);

                    // Vu qu'il ya le changement du schema de Formulaire dans la bdd donc je change SSI en RSD
                    //1)
                    database
                      .ref(
                        "/Formulaires/RSD/Formulaire" +
                          IdFormulaire +
                          "/ContenuFormulaire"
                      )
                      .set(this.state.tab);
                    //2)
                    database
                      .ref(
                        "/Formulaires/RSD/Formulaire" +
                          IdFormulaire +
                          "/TitreFormulaire"
                      )
                      .set(this.state.TitreDuFormulaire);

                    let tableauaajouter = this.state.tab.Options;
                    console.log("rechercher frr", tableauaajouter);

                    let LesMatriculesDesEtudiantsChoisi = this.state
                      .selectedOption.value;
                    // Hachée les matricules en SHA256

                    database
                      .ref(
                        "ComptesEtudiants/" +
                          LesMatriculesDesEtudiantsChoisi +
                          "/"
                      )
                      .once("value", (snapshot) => {
                        let VariableEtudiantChoisiMatricule = snapshot.val();

                        Object.keys(VariableEtudiantChoisiMatricule).map(
                          (element) => {
                            const obj = {
                              mat: element,
                            };
                            console.log("matricule", obj);

                            axios
                              .post("https://backend.e-cop.digital/hash/hash", obj)
                              .then((res) => {
                                console.log(res.data.MatriculeHashee);
                                const MatriculeHashee =
                                  res.data.MatriculeHashee;
                                const obj = {
                                  vote: false,
                                };
                                //3)
                                database
                                  .ref(
                                    "/Formulaires/RSD/Formulaire" +
                                      IdFormulaire +
                                      "/Matricule/" +
                                      MatriculeHashee
                                  )
                                  .set(obj);
                              });
                            //-------- Récupération de la clé public et des 2 hash a envoyé au profs et au delegué

                            /*    
                              database
                                .ref(
                                  "/Formulaires/SSI/Formulaire" +
                                    IdFormulaire +
                                    "/" +
                                    element +
                                    "/vote"
                                )
                                .set(this.state.valueFirebase); */
                          }
                        );
                      });
                    const ObjectCle = { IdFormulaire: IdFormulaire };
                    axios
                      .post("https://backend.e-cop.digital/RSA/cle", ObjectCle)
                      .then((res) => {
                        console.log("resss", res.data);
                        // Pusher la clé publique du fromulaire //
                        const ClePublique = { clepublique: res.data.PublicKey };
                        database
                          .ref(
                            "/Formulaires/RSD/Formulaire" +
                              IdFormulaire +
                              "/ClePublic"
                          )
                          .set(ClePublique);
                        // envoie des clés au delegue et au prof //
                        let emailDelegue = "";
                        if (1 === 1) {
                          if (this.state.selectedOption === "SSI") {
                            emailDelegue = "karimoussaid07@gmail.com";
                          } else {
                            emailDelegue = "karimoussaid07@gmail.com";
                          }
                          const hash = res.data.hash2;

                          const ObjetDesMail = {
                            email: emailDelegue,
                            hash: hash,
                          };
                          axios
                            .post(
                              "https://backend.e-cop.digital/SendingMail/SendingMail",
                              ObjetDesMail
                            )
                            .then((res) => {
                              console.log("email Sent Succefuly to kairm");
                            })
                            .catch((err) => {
                              console.log("erreur", err);
                            });
                        }

                        let emailProf = "";
                        if (1 === 1) {
                          if (matriculeProf === 1056) {
                            emailProf = "boukercharyad@gmail.com";
                          } else {
                            emailProf = "boukercharyad@gmail.com";
                          }
                          const hash = res.data.hash1;

                          const ObjetDesMail = {
                            email: emailProf,
                            hash: hash,
                          };
                          axios
                            .post(
                              "https://backend.e-cop.digital/SendingMail/SendingMail",
                              ObjetDesMail
                            )
                            .then((res) => {
                              console.log("email Sent Succefuly to boukercha");
                            })
                            .catch((err) => {
                              console.log("erreur", err);
                            });
                        }
                      });
                    let Idfrm = Math.random().toString(36).substr(2, 9);

                    let cun = [false, false, false, false, false];
                    this.setState({
                      tab: [],
                      Formulaire: cun,
                      PopUpActive: true,
                      showPopup: !this.state.showPopup,
                      AffichageMessageSuccee: true,
                      IdFormulaire: Idfrm,
                      TitreDuFormulaire: "",
                    });

                    document.getElementById("jamaisjamais").style.display =
                      "flex";
                  }}
                >
                  {" "}
                  Enregistrer le formulaire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Formulaire2;

/**
 * Pour récuperer les données de firestore :
 * const db = firebase.firestore();
 * db.collection('Formulaires').get().then((snapshot)=>{  //.get() : retourne tous les documents de la collection
 *
 *  })
 *
 *
 *
 *
 *
 *
 *
 */
