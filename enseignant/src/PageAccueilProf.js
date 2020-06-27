import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Avatar, Popover , Input } from 'antd';
import { Modal } from 'antd';
import {TextField} from "@material-ui/core"
import 'antd/dist/antd.css';
import './index.css'
import { auth } from "./firebase";
import {
  faPlus,
  faPowerOff,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";


class PageAccueilProf extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }
  render() {
    return (
      <div className="header_wrapper">
        
        <svg className="bingo" xmlns="http://www.w3.org/2000/svg" viewBox="0 40 940 320">
          <path className="bingo2" fill-opacity="1" d="M0,192L720,256L1440,96L1440,0L720,0L0,0Z"></path>
          <defs>
            <linearGradient id="MyGradient">
              <stop offset="10%" stop-color="#026a98" />
              <stop offset="90%" stop-color="#02a4ba" />
            </linearGradient>
          </defs>
        </svg>
        <div className="allpage">
          <div className="head">
            <div className="headfirst">
              <div><p>E-CoP</p><span className="spann"> usthb</span></div>
              <div className="fffff"><Avatar className="avatar" >U</Avatar>
                <Popover content={<div>
                  <p>Content</p>
                  <p>Content</p>
                </div>}
                  title="Title">
                  <div><Avatar className="avatar" >?</Avatar></div>
                </Popover>
		<Link
                  to=""
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  <Button>Disconnect</Button>
                </Link>
              </div>
            </div>
            <div className="headsecond"><div><p>Comité pédagogique</p><p id="kkk">avec E-CoP</p></div></div>

          </div>

          <div >
            <p>Avec cette platforme vous créez des sondages en ligne gratuits sur des images, dates et textes libres. Décidez si vos participants peuvent voter sans inscription, anonymement, uniquement avec un mot de passe ou avec un compte vérifié. Différentes méthodes de vote et de nombreuses autres fonctions sont disponibles pour votre sondage en temps réel.</p>
            <p>Avec notre logiciel, vous pouvez créer des votes sur....</p>
          </div>
          <div className="jjj">
            <Link to="RechercherFormulaire">
              <Button className="btn1">Rechercher</Button>
            </Link>
            <Link to="AjouterFormulaire">
              <Button className="btn2" animated>
                <Button.Content visible>Creer formulaire</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Link>
            
              
            
          </div>

        </div>
        
      </div>
    );
  }
}

export default PageAccueilProf;
