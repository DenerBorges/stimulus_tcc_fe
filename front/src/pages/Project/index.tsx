import {
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

import "./styles.css";

const Project: React.FC = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <img
              src={require("../../assets/images/logo_1.png")}
              alt="Logo do site"
              className="logo mx-auto d-block"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex mx-auto" role="search">
              <div className="searchIcon">
                <input
                  className="pesquisa form-control text-light me-2"
                  type="search"
                  placeholder="     Pesquisar"
                  aria-label="Search"
                />
                <MagnifyingGlassIcon />
              </div>
              <button className="btn btn-outline-info fw-medium" type="submit">
                Pesquisar
              </button>
            </form>
            <ul className="navbar-nav mt-1">
              <li className="nav-item border rounded me-1">
                <a className="nav-link fw-medium" href="/categories">
                  Categorias
                </a>
              </li>
              <li className="nav-item border rounded me-1">
                <a className="profile nav-link fw-medium" href="/">
                  Login
                  <UserCircleIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Nome do Projeto
      </h1>
      <div className="container text-center bg-light bg-gradient my-5 mx-auto">
        <div className="row row-cols-lg-2 row-cols-1 border secondary">
          <div className="col">
            <img
              src={require("../../assets/images/default_product.png")}
              className="img-fluid"
              alt="imagem do projeto"
            />
          </div>
          <div className="col p-4">
            <u className="text-start fw-medium">Criador: Nome do criador</u>
            <div className="m-5">
              <p className="text-start fw-semibold">
                Atingido: <span className="text-info">50%</span>
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info progress-bar-striped w-50"></div>
              </div>
              <p className="text-start fw-medium">
                Meta: <span className="text-secondary">R$ 400</span>
              </p>
            </div>
            <div className="mx-5">
              <h2 className="fw-bolder">
                Arrecadado: <span className="text-info">R$ 200</span>
              </h2>
            </div>
            <button
              className="btn btn-info text-light rounded-pill mt-5 pb-2 pt-2 fs-3 fw-semibold shadow-sm"
              type="submit"
            >
              Financiar projeto
              <CurrencyDollarIcon className="dollarIcon" />
            </button>
          </div>
        </div>
      </div>

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
            <a href="/home">
              <img
                src={require("../../assets/images/facebook_logo.png")}
                alt="facebook"
                width="30"
                className="me-2"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/gmail_logo.png")}
                alt="gmail"
                width="30"
                className="me-2"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/linkedin_logo.png")}
                alt="linkedin"
                width="30"
                className="me-1"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/twitter_logo.png")}
                alt="twitter"
                width="35"
                className="me-1"
              />
            </a>
            <a href="/home">
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
    </>
  );
};

export default Project;
