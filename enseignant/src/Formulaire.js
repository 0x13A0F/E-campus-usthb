import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Formulaire.css";
import BorderWrapper from "react-border-wrapper";

class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="principale">
        <BorderWrapper
          borderColour="#black"
          borderWidth="3px"
          borderRadius="15px"
          borderType="solid"
          innerPadding="30px"
          topPosition={0.05}
          topOffset="22px"
          topGap="4px"
          rightPosition={0.1}
          rightOffset="22px"
          rightGap="4px"
        >
          <input className="input" placeholder=" Nom du module" />
          <br />

          <textarea className="textarea" placeholder=" Question" />
        </BorderWrapper>
      </div>
    );
  }
}

export default Formulaire;
