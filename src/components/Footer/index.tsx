import React from "react";

import "./styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="container-fluid mt-3 p-3 text-center">
      <div className="row">
        <div className="col">
          <img
            src={require("../../assets/images/logo_1.png")}
            alt="Logo do site"
            width="300"
            className="mt-2"
          />
        </div>
        <div className="col">
          <p className="fw-medium fs-4 mt-1 text-light">Contate-nos</p>
          <a href="/">
            <img
              src={require("../../assets/images/facebook_logo.png")}
              alt="facebook"
              width="30"
              className="me-1"
            />
          </a>
          <a href="/">
            <img
              src={require("../../assets/images/twitter_logo.png")}
              alt="twitter"
              width="31"
              className="me-1"
            />
          </a>
          <a href="/">
            <img
              src={require("../../assets/images/gmail_logo.png")}
              alt="gmail"
              width="30"
              className="me-2"
            />
          </a>
          <a href="/">
            <img
              src={require("../../assets/images/linkedin_logo.png")}
              alt="linkedin"
              width="30"
              className="me-1"
            />
          </a>
          <a href="/">
            <img
              src={require("../../assets/images/whatsapp_logo.png")}
              alt="whatsapp"
              width="30"
              className="me-2"
            />
          </a>
        </div>
        <div className="col">
          <p className="fw-medium text-light mt-4">
            Copyright © 2023 <br /> Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
