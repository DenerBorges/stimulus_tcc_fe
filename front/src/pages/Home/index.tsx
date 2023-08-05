import React from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import "./styles.css";

const Home: React.FC = () => {
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
        Projetos em destaque
      </h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/home">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
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

export default Home;
