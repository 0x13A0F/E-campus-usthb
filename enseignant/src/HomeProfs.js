import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import Select from "react-select";
import { auth, storage } from "./firebase";
import Wrapper from "./Component/DatePic";

import "./HomeProfs.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class HomeProfs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputValue: "",
      items: [],
      selectedOption: null,
      value: false,
      number: 0,
      multiple: false,
    };
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  AddToDo() {
    event.preventDefault();
    this.setState({
      InputValue: "",
      items: [...this.state.items, this.state.InputValue],
    });
  }
  DeleteTodo(event) {
    console.log("eooooo");
    event.preventDefault();
    const array = this.state.items;
    const index = array.indexOf(event.target.value);
    console.log(1);
    array.splice(index, 1);
    this.setState({
      items: array,
    });
  }
  renderTodo() {
    return this.state.items.map((item) => {
      return (
        <div key={item}>
          {item} | <button onClick={this.DeleteTodo.bind(this)}> X</button>
        </div>
      );
    });
  }

  render() {
    const { selectedOption, value } = this.state;

    return (
      <div className="main">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="sidebar">
          <a href="#home">
            <i class="fa fa-fw fa-home"></i> Home
          </a>
          <a href="#services">
            <i class="fa fa-fw fa-wrench"></i> Services
          </a>
          <a href="#clients">
            <i class="fa fa-fw fa-user"></i> Clients
          </a>
          <a href="#contact">
            <i class="fa fa-fw fa-envelope"></i> Contact
          </a>
        </div>
        <div class="header">
          <a href="#default" class="logo">
            CompanyLogo
          </a>
          <div class="header-right">
            <a class="active" href="#home">
              Home
            </a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>{" "}
        <div className="divprincipale">
          <h2>uploaded file on firebase storage</h2>
          <input type="file" id="watwati" name=" filename" />
          <button
            onClick={() => {
              let file = document.getElementById("watwati").files[0];
              storage
                .ref()
                .child("PDF" + file.name)
                .put(file)
                .then((result) => {
                  console.log("uploaded garented");
                })
                .catch((error) => console.log(error));
            }}
          >
            Upload file
          </button>

          <button
            onClick={() => {
              storage
                .ref()
                .child("PDFA.pdf")
                .getDownloadURL()
                .then((result) => {
                  console.log(result);
                  const url = result;
                  const existingPdfBytes = fetch(url).then((res) => res.text());
                  console.log(existingPdfBytes);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            {" "}
            Show Pdf
          </button>
          <h1> Todo List</h1>
          <Wrapper />
          <div style={{ width: 400 }}>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              style={{ width: 100 }}
            />
            <h1>wat</h1>
            <button onClick={() => auth.signOut()}> Logout</button>
          </div>

          <form className="form-row align-items-center">
            <Button
              variant="primary"
              style={{ heigh: 30, width: 290 }}
              onClick={() => {
                this.state.value = true;
              }}
            >
              wat <IoMdAddCircleOutline />
            </Button>{" "}
            <input
              value={this.state.InputValue}
              onChange={(event) =>
                this.setState({ InputValue: event.target.value })
              }
              type="text"
              placeholder="add an item"
            />
            <button onClick={this.AddToDo.bind(this)}> Ajouter</button>
            {value && (
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                style={{ width: 100 }}
              />
            )}
          </form>
          <button onClick={() => this.setState({ value: true })}>
            {" "}
            add to fire
          </button>
          <button onClick={() => this.setState({ value: false })}>
            {" "}
            add to fire2
          </button>
          <div>{this.renderTodo()}</div>
          <div>
            <input
              type="number"
              value={this.state.number}
              onChange={(evt) => this.setState({ number: evt.target.value })}
            />
            <button onClick={() => this.setState({ multiple: true })}>
              {" "}
              ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeProfs;
/*
import React, { Component } from "react";
import { auth } from "./firebase";
import "./Home.css";
class Home extends Component {
  state = {};
  logout() {}
  render() {
    {
      console.log("props", this.props.CurrentUser.email);
    }
    return (
      <div className="main">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="sidebar">
          <a href="#home">
            <i class="fa fa-fw fa-home"></i> Home
          </a>
          <a href="#services">
            <i class="fa fa-fw fa-wrench"></i> Services
          </a>
          <a href="#clients">
            <i class="fa fa-fw fa-user"></i> Clients
          </a>
          <a href="#contact">
            <i class="fa fa-fw fa-envelope"></i> Contact
          </a>
        </div>
        <div class="header">
          <a href="#default" class="logo">
            CompanyLogo
          </a>
          <div class="header-right">
            <a class="active" href="#home">
              Home
            </a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>{" "}
        <h1>
          {" "}
          you're home {this.props.CurrentUser.name}{" "}
          {this.props.CurrentUser.prenom}
        </h1>{" "}
        <button onClick={() => auth.signOut()} style={{ marginTop: 100 }}>
          {" "}
          Log out
        </button>{" "}
      </div>
    );
  }
}

export default Home;



*/
