import React, { Component } from "react";
import "./AffichageFormulaire2_elemment.css";
import { Link } from "react-router-dom";
import { Modal, Input, Button,Tooltip } from "antd";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Button as Btn } from 'semantic-ui-react'

export default class AffichageFormulaire2_elemment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      Hash_1: "",
      Hash_2: "",
      PrivateKey: "",
      Youcan: false,
    };
  }

  btnAffiche() {
    var now2 = new Date();

    if (now2 > this.props.date && !this.state.Youcan) {
      console.log("aaa", now2 < this.props.date);
      return (
        <div>
          {" "}
          <Button onClick={this.showModal}>Consulter</Button>
          <Modal
            title="Envoi des hashes"
            centered
            visible={this.state.visible}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,

              <Button
                key="submit"
                type="primary"
                onClick={async () => {
                  const Objectt = {
                    form_id: this.props.IdFormulaire,
                    share1_hash: this.state.Hash_1,
                    share2_hash: this.state.Hash_2,
                  };
                  console.log("Objet", Objectt);
                  axios
                    .post("https://backend.e-cop.digital/RSA/GivePrivateKey", Objectt)
                    .then((res) => {
                      console.log(res.data.PrivateKey);
                      this.setState({
                        PrivateKey: res.data.PrivateKey,
                        Youcan: true,
                      });
                    });
                }}
              >
                Submit
              </Button>,
            ]}
          >
            <TextField
              id="standard-basic"
              label="Hash1"
              value={this.state.Hash_1}
              onChange={(event) => {
                this.setState({ Hash_1: event.target.value });
              }}
              style={{ width: "100%" }}
            />
            <p></p>
            <TextField
              id="standard-basic"
              label="Hash2"
              value={this.state.Hash_2}
              onChange={(event) => {
                this.setState({ Hash_2: event.target.value });
              }}
              style={{ width: "100%" }}
            />{" "}
            <p></p>
          </Modal>{" "}
        </div>
      );
    } else if (now2 > this.props.date && this.state.Youcan) {
      return (
        <div>
          <Link
            to={{
              pathname: "/Home2",
              query: {
                PrivateKey: this.state.PrivateKey,
                IdFormulaire: this.props.IdFormulaire,
              },
            }}
          >
            <Button>Allez vers le resultat</Button>
          </Link>
        </div>
      );
    } else {
      return <Tooltip title="prompt text"><Btn disabled>Consulter</Btn></Tooltip>;
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const IdFormulaire = this.props.IdFormulaire;
    const date = this.props.date;
    const date2 = date.toDateString();
    return (
      <div className="Affichageformulairewrapper">
        <div className="Affichageformulaire1">
          <div>
            <span className="ElementTitle">Titre : </span>
            <span>{this.props.titre}</span>
          </div>
          <span className="ElementTitle">Date : </span>
          <span>{date2}</span>
        </div>
        {this.btnAffiche()}
      </div>
    );
  }
}
