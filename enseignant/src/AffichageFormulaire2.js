import React, { Component } from "react";
import { database, auth } from "./firebase";
import Element from "./AffichageFormulaire2_elemment";
import { Empty, Button } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPowerOff,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Button as Btn, Header as Head, Icon, Segment,Divider } from 'semantic-ui-react'
import Header from './Component/Header'


export default class AffichageFormulaire2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabFormulaire: [],
      tabDate: [],
      length: 0,
      tabTitre: [],
    };
  }

  componentDidMount() {
    database.ref("Formulaires/RSD/").on("value", (snapshot) => {
      console.log(snapshot.val());
      let tab = Object.keys(snapshot.val());
      let Taille = tab.length;
      this.setState({
        tabFormulaire: tab,
        length: Taille,
      });
      console.log("a", this.state.tabFormulaire);
      let tablu = [];
      let tablua = [];
      tab.map((element3) => {
        database
          .ref("Formulaires/RSD/" + element3 + "/")
          .on("value", (snap3) => {
            let x = snap3.val().Date.a;
            console.log(x);
            let y = snap3.val().TitreFormulaire;
            tablua.push(y);
            tablu.push(x);
          });
      });
      console.log(tablu);
      console.log("I DID MOUNT");

      this.setState({ tabDate: tablu, tabTitre: tablua });
    });
  }
  render() {
    const tabFormulaire = this.state.tabFormulaire;
    const tabFormulaireForDate = this.state.tabDate;
    const tabFormulaireForTitre = this.state.tabTitre;
    var now2 = new Date();
    //   console.log(now2);
    return (
      <div>
        <Header></Header>

        {this.state.length <= 0 && (
          <div>
            <Segment style={{ margin: "6%", height: "70vh" }} placeholder>
              <Head icon>
                <Icon name='search' />
                We don't have any documents matching your query.
              </Head>
              <Link to="AjouterFormulaire">
                <Btn style={{ backgroundColor: "#026a98" }} primary>Ajouter formulaire</Btn>
              </Link>
            </Segment>
          </div>
        )}

        

        {this.state.length > 0 &&
          <div>
          <Segment style={{ margin: "6%",marginLeft:"11%",marginRight:"11%" }} placeholder>
            <Divider horizontal>
              <Head as='h4'>
                <Icon name='list' />
                Liste des formulaire
              </Head>
            </Divider>
            <br/>
            {
              tabFormulaire.map((element, index) => {
                var now = new Date(tabFormulaireForDate[index]);
                let titreFormulaire = tabFormulaireForTitre[index];
                console.log("element", element);
                console.log("non", now);
                console.log("index", index);
                return (
                  <Element
                    titre={titreFormulaire}
                    date={now}
                    IdFormulaire={element}
                  />
                );
              })
            }



          </Segment>
        </div>
          }
        
      </div>
    );
  }
}
