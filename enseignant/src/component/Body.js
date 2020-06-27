import React from "react";
import "./body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import ElementFormulaire from "./ElementFormulaire";
export default function Body() {
  return (
    <div>
      <div className="header_wrapper">
        <div className="petitheader_wrapper">
          <div className="logo"></div>
          <div className="nav-menu">
            <div className="nav-item">
              <a href="/enterprise" className="">
                Home
              </a>
            </div>
            <div className="nav-item">
              <a href="/enterprise" className="">
                contact
              </a>
            </div>
            <div className="nav-item">
              <a href="/enterprise">déconnexion</a>
              <FontAwesomeIcon
                className="icon"
                icon={faPowerOff}
                color="#001c9b"
              />
            </div>
          </div>
        </div>
        <div className="image_wrapper"></div>
      </div>

      <div className="body_wrapper">
        <div className="head_body_wrapper">
          <h2>Formulaires récents</h2>
        </div>
        <div className="center">
          <ElementFormulaire />
          <ElementFormulaire />
          <div className="element">
            <FontAwesomeIcon className="fontcss" icon={faPlus} />
          </div>
        </div>
      </div>
    </div>
  );
}
