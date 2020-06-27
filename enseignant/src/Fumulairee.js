import React, { Component } from "react";
import { Card, Button, ThemeProvider } from "react-bootstrap";
import "./Formulaire.css";
import BorderWrapper from "react-border-wrapper";
import Formulaire2 from "./Formulaire2";
import { database } from "./firebase";

class Formulairee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NomModule: "",
      Question: "",
      option: "",
      Options: [],
      valie: false,
    };
  }

  AddToDo() {
    if (this.state.Options.length < 4) {
      event.preventDefault();
      this.setState({
        Options: [...this.state.Options, this.state.option],
        option: "",
      });
    }
  }
  renderTodo() {
    return this.state.Options.map((item) => {
      return (
        <div key={item}>
          <input className="option" value={item} /> |{" "}
          <button
            onClick={() => {
              const array = this.state.Options;
              const index = array.indexOf(item);
              console.log(index);
              array.splice(index, 1);
              this.setState({
                Options: array,
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
          <br />
          <input
            className="option"
            placeholder=" option"
            value={this.state.option}
            onChange={(event) => this.setState({ option: event.target.value })}
          />{" "}
          <button onClick={this.AddToDo.bind(this)}> Ajouter</button>
          <br />
          <button
            onClick={() => {
              database.ref("nouveau").push(1);
            }}
          >
            watwatfirebase
          </button>
          <div>{this.renderTodo()}</div>
        </BorderWrapper>
      </div>
    );
  }
}

export default Formulairee;
