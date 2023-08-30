import React from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const Navbar: React.FC = () => {
  return (
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
            <div className="searchIcon input-group">
              <input
                className="pesquisa form-control rounded-end text-light me-2"
                type="search"
                placeholder="     Pesquisar"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info rounded fw-medium"
                type="submit"
              >
                Pesquisar
              </button>
              <MagnifyingGlassIcon />
            </div>
          </form>
          <ul className="navbar-nav mt-1">
            <li className="nav-item border rounded me-1">
              <a className="navBtns nav-link fw-medium" href="/create_project">
                Crie seu projeto
                <PlusIcon />
              </a>
            </li>
            <li className="nav-item border rounded me-1">
              <a className="navBtns nav-link fw-medium" href="/categories">
                Categorias
                <TagIcon />
              </a>
            </li>
            <li className="nav-item border rounded me-1">
              <a className="navBtns nav-link fw-medium" href="/">
                Login
                <UserCircleIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
