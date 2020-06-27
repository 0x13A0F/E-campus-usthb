import React, { Component } from "react";
import { auth, database } from "./firebase";
import "./Home.css";
import axios from "axios";
//---------------------------------------//
import { Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Avatar, Popover } from "antd";
import "antd/dist/antd.css";
import { Radio, Input } from "antd";
import DrawerForm from "./DrawerForm";

//---------------------------------------//

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaire: [],
      binaire: false,
      tab: [1, 2, 3],
      TableauDeVote: [],
      TableauDOptionsSelectione: [[], [], [], [], [], [], [], []],
      TableauAideVote: [],
      ok: false,
      tableaukoi: [],
      FormNonComplet: false,
      MatriculeHashee: null,
      collapsed: false,
      isDelegue: false,
    };
  }
  componentDidMount() {
    const MatriculeEtudiantActuelle = this.props.CurrentUser.matricule;
    const obj = {
      mat: MatriculeEtudiantActuelle,
    };
    axios.post("https://backend.e-cop.digital/hash/hash", obj).then((res) => {
      const MatriculeHashe = res.data.MatriculeHashee;
      this.setState({ MatriculeHashee: MatriculeHashe });
    });
    let x = this.props.CurrentUser.matricule;
    database.ref("Etudiant/" + x).on("value", (snapshot) => {
      let xu = snapshot.val();
      if (xu.delegue === "oui") {
        this.setState({ isDelegue: true });
      }
    });
  }
  logout() {}

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  delegue() {}

  render() {
    const MatriculeEtudiantActuelle = this.props.CurrentUser.matricule;
    {
      console.log("props", this.props.CurrentUser.email);
      console.log("aaaaaaaaaa", this.props.CurrentUser);
    }
    return (
      <div>
        <div className="main">
          <svg
            className="bingo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 40 940 320"
          >
            <path
              className="bingo2"
              fill-opacity="1"
              d="M0,192L720,256L1440,96L1440,0L720,0L0,0Z"
            ></path>
            <defs>
              <linearGradient id="MyGradient">
                <stop offset="10%" stop-color="#e7305b" />
                <stop offset="90%" stop-color="#e2979c" />
              </linearGradient>
            </defs>
          </svg>
          <div className="allpage">
            <div className="head">
              <div className="headfirst">
                <div>
                  <p>E-CoP</p>
                  <span className="spann"> usthb</span>
                </div>
                <div className="fffff">
                  <Avatar className="avatar">U</Avatar>
                  <Popover
                    content={
                      <div>
                        <p>Content</p>
                        <p>Content</p>
                      </div>
                    }
                    title="Title"
                  >
                    <div>
                      <Avatar className="avatar">?</Avatar>
                    </div>
                  </Popover>
                  <Button
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    {" "}
                    Disconnect
                  </Button>
                </div>
              </div>
              <div className="headsecond">
                <div>
                  <p>Comité pédagogique</p>
                  <p id="kkk">avec E-CoP</p>
                </div>
              </div>
            </div>

            <div>
              <p>
                Avec cette platforme vous pouvez consulter les formulaires
                publiés par le professeur résponsable pour le CP, c'est un CP
                Numérique avec lequelle vous pouvez faire vos choix au questions
                posé en tout annonymat(identité secrete).
              </p>
            </div>
            <div className="jjj">
              {this.state.isDelegue && <DrawerForm />}
              <Button
                className="btn2"
                animated
                onClick={() => {
                  let specialite = this.props.CurrentUser.specialite;
                  let Trouver = this.state.MatriculeHashee;
                  if (specialite === "SSI") {
                    database.ref("Formulaires/RSD").on("value", (snapshot) => {
                      console.log("objet firebase", snapshot.val());
                      let x = snapshot.val();
                      let y = Object.keys(x);
                      console.log("la clé du formulaire :", y);
                      let IdFormulaireTableauDeVote = this.state
                        .TableauAideVote;
                      IdFormulaireTableauDeVote.push(y);
                      // console.log(IdFormulaireTableauDeVote);
                      console.log("Formulaire", Object.values(x));
                      // if

                      this.setState({
                        formulaire: Object.values(x),
                        binaire: true,
                        TableauAideVote: IdFormulaireTableauDeVote,
                        tableaukoi: IdFormulaireTableauDeVote,
                      });
                      console.log("il arrive");
                      console.log(Object.values(x)[0].ContenuFormulaire);

                      //  let z = Object.values(x);
                      // console.log(z.Date);
                    });
                  }
                }}
              >
                <Button.Content visible>
                  Consulter les formulaires
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </div>
        </div>
        {this.state.binaire &&
          this.state.formulaire.map((element) => {
            // l'index du formulaire pour ajouter les valeur checké au formulaire
            console.log("1003", this.state.formulaire.indexOf(element));
            let x = this.state.TableauDeVote;
            console.log("element inside ", element.Date.a);
            var newDate = element.Date.a;
            var nesnesDate = new Date(newDate);
            var date = new Date();
            console.log("riadriad", element);
            let Condition = element.Matricule;
            console.log("Condition", Object.keys(Condition));
            let tableauMatriculeARechercher = Object.keys(Condition);
            let Valeurbolleen = false;
            tableauMatriculeARechercher.map((element) => {
              if (element === this.state.MatriculeHashee) {
                Valeurbolleen = true;
              }
            });

            let matrt = this.state.MatriculeHashee;
            let VleurBollen2 = null;
            console.log("matmr", matrt);
            //-----------------------------------//
            let tableauo = [];
            // Je recupere les idFormulaires de la bdd
            database.ref("Formulaires/RSD").on("value", (snapshot) => {
              let x = snapshot.val();
              let y = Object.keys(x);

              tableauo.push(y);
            });
            let chemin3 = tableauo[0][this.state.formulaire.indexOf(element)];
            console.log(tableauo);

            database
              .ref(
                "Formulaires/RSD/" + chemin3 + "/Matricule/" + matrt + "/vote"
              )
              .on("value", (snapshot) => {
                console.log("snapshotttt", snapshot.val());
                VleurBollen2 = snapshot.val();
              });

            let elemenVote = element.Matricule;
            console.log(elemenVote.matrt);
            console.log("alors", elemenVote);
            //---------------- vote une fois --------------------//
            let xxx = this.state.TableauAideVote[0][
              this.state.formulaire.indexOf(element)
            ];
            let yyyy = this.props.CurrentUser.matricule;

            console.log(element[yyyy]);
            //---------------------------------------------------//
            // ajoute la cond de vote = false
            if (date < nesnesDate && Valeurbolleen && !VleurBollen2) {
              return (
                <div className="DivEnglobanteDuFormulaire">
                  <div className="DivWatu">
                    <text className="TitreDuFormulaire">
                      {" "}
                      Formulaire : {element.TitreFormulaire}
                    </text>
                    <br />
                    <text className="DateLimite">Date : {element.Date.a} </text>
                  </div>
                  {element.ContenuFormulaire.map((element2) => {
                    // l'index de la valeur checke dans le tableu des options dans le formulaire
                    console.log(
                      "1002",
                      element.ContenuFormulaire.indexOf(element2)
                    );
                    let compter = 0;
                    let TableauPourOptions = Object.values(element2.Options);

                    return (
                      <div className="divwat">
                        <div className="container_formulaire_head">
                          <text className="NomDuModule">
                            Nom Du module : {element2.NomModule}{" "}
                          </text>
                          <text className="Question">
                            Question : {element2.Question}
                          </text>
                          <text className="OptionsTxt">
                            Choisissez votre réponse:
                          </text>
                          {TableauPourOptions.map((element3) => {
                            compter++;
                            return (
                              <div className="InpUti">
                                <text className="optionsjsss">{compter})</text>
                                <text className="optionsjsss">{element3}</text>

                                <input
                                  type="radio"
                                  name={element.ContenuFormulaire.indexOf(
                                    element2
                                  )}
                                  value="non"
                                  onClick={() => {
                                    console.log("ischecked");

                                    let Index2 = element.ContenuFormulaire.indexOf(
                                      element2
                                    );
                                    let Index1 = this.state.formulaire.indexOf(
                                      element
                                    );
                                    console.log(" ehre ", Index1, Index2);
                                    let valueChecked = element3;
                                    let x = this.state
                                      .TableauDOptionsSelectione;
                                    x[Index1][Index2] = valueChecked;
                                    this.setState({
                                      TableauDOptionsSelectione: x,
                                    });
                                    let y = this.state.TableauAideVote;
                                    let z = this.state
                                      .TableauDOptionsSelectione;
                                    let zz =
                                      z[this.state.formulaire.indexOf(element)];
                                    //    console.log(
                                    //    "problemeeeee",
                                    //  y[0][this.state.formulaire.indexOf(element)]
                                    //);
                                    let Optionss = [zz];
                                    let IdForum =
                                      y[0][
                                        this.state.formulaire.indexOf(element)
                                      ];
                                    let object11 = {
                                      IdFormulaire: IdForum,

                                      Options: Optionss,
                                    };
                                    console.log("Probleme", object11);
                                    let u = { a: 1, b: 2 };
                                    y[0][
                                      this.state.formulaire.indexOf(element)
                                    ] = object11;

                                    this.setState({ TableauDeVote: y });
                                    /* let y = this.state.TableauDeVote;
                                  let xx = y[0][0];
                                  console.log("first element", xx);
                                  let z = this.state.TableauDOptionsSelectione;
                                  let w =
                                    z[this.state.formulaire.indexOf(element)];

                                  let Object1 = { IdFormulaire: x, Options: w };
                                  y[0][0] = Object1;  
                                  this.setState({ TableauDeVote: Object1 });*/
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="DivWatuS">
                    <button
                      className="aertt"
                      onClick={() => {
                        let tableau = [];
                        // Je recupere les idFormulaires de la bdd
                        database
                          .ref("Formulaires/RSD")
                          .on("value", (snapshot) => {
                            let x = snapshot.val();
                            let y = Object.keys(x);

                            tableau.push(y);
                          });
                        // l'index du formulaire affichée
                        console.log(this.state.formulaire.indexOf(element));
                        //l'id du formulaire correspendant (pour validation du choix )
                        console.log(
                          tableau[0][this.state.formulaire.indexOf(element)]
                        );
                        //----------------------------------------------------//
                        let mat = this.props.CurrentUser.matricule;
                        // la longeure du tableau des choix
                        console.log(
                          this.state.TableauDOptionsSelectione[
                            this.state.formulaire.indexOf(element)
                          ].length
                        );
                        // les choix de l'etudiants par rapport au formulaire
                        let choix = this.state.TableauDOptionsSelectione[
                          this.state.formulaire.indexOf(element)
                        ];
                        console.log(choix);
                        // POur apres
                        /*   let xer = choix;
                        xer.push("ac");
                        console.log(xer); */
                        //-------------------------------------------------//
                        let longeureDuTableauDesChoix = this.state
                          .TableauDOptionsSelectione[
                          this.state.formulaire.indexOf(element)
                        ].length;
                        let IdFormulaireActuel =
                          tableau[0][this.state.formulaire.indexOf(element)];

                        // comparer la longeur du tableau des choix (pour assurer qu'il a voté sur tout les questions)
                        choix.includes(undefined);
                        console.log(
                          Object.values(choix).length === choix.length
                        ); // true
                        let ConfirmerFormulaire =
                          Object.values(choix).length === choix.length;

                        if (ConfirmerFormulaire) {
                          let chemin =
                            tableau[0][this.state.formulaire.indexOf(element)];
                          console.log("chemin", chemin);
                          // crypter les choix et vote true
                          let ClePublic = "";
                          database
                            .ref(
                              "Formulaires/RSD/" +
                                chemin +
                                "/ClePublic/clepublique"
                            )
                            .on("value", (snapshot) => {
                              ClePublic = snapshot.val();
                            });
                          console.log("clePublic", ClePublic);

                          const MAte = this.state.MatriculeHashee;
                          console.log("Mate", MAte);
                          database
                            .ref(
                              "Formulaires/RSD/" +
                                chemin +
                                "/Matricule/" +
                                MAte +
                                "/vote"
                            )
                            .set(true);
                          // essayer de crypter les resultas

                          /**
                           * 
                           * 
                           * 
                           * {
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
                           */
                          let conteur = 0;

                          choix.map((element) => {
                            const obj = {
                              MessageACrypter: element,
                              Key: ClePublic,
                            };
                            console.log("matricule", obj);
                            axios
                              .post("https://backend.e-cop.digital/RSA/crypt", obj)
                              .then((res) => {
                                console.log(res.data);

                                const Object = {
                                  [`${conteur}`]: res.data.MessageCrypter,
                                };
                                console.log("Object", Object);
                                database
                                  .ref(
                                    "Formulaires/RSD/" +
                                      chemin +
                                      "/Matricule/" +
                                      MAte +
                                      "/choix/" +
                                      [`${conteur}`]
                                  )
                                  .set(res.data.MessageCrypter);
                                conteur = conteur + 1;
                              });
                          });
                        }
                      }}
                    >
                      Valider votre choix
                    </button>
                  </div>
                </div>
              );
            }
          })}
        {/*this.state.binaire && (
          <div className="divwat">
            <div className="container_formulaire_head">
              <label className="lbl_textarea">Formula 1</label>
              <label className="lbl_textarea">Date fin :p : </label>
            </div>

            <div className="container_formulaire">
              <label className="lbl_textarea">module</label>
              <label className="lbl_textarea">wech rayek f prof?</label>
              <div className="repRadioBtn">
                <input type="radio" name="lzmYkounouKifkif" value="oui" />
                <label>oui</label>
              </div>
              <div className="repRadioBtn">
                <input type="radio" name="lzmYkounouKifkif" value="non" />
                <label>non</label>
              </div>
              <div className="repRadioBormulaires/SSI/[object Object]/tn">
                <input type="radio" name="lzmYkounouKifkif" value="chuiya" />
                <label>chuiya</label>
              </div>
            </div>
          </div>
        )*/}
      </div>
    );
  }
}

export default Home;
