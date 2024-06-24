import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import {
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { userType } from "../../types/user";
import api from "../../utils/api";

import "./styles.css";

const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<userType>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
  };

  useEffect(() => {
    const getProfile = async () => {
      if (isLoggedIn) {
        try {
          const response = await api.get("users/profile");
          setProfile(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProfile();
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <nav
      className="navbar navbar-expand-xl bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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
          <SearchBar />
          <ul className="navbar-nav mt-2">
            {isLoggedIn ? (
              <>
                <li className="nav-item border rounded me-1">
                  <a
                    className="navBtns nav-link fw-medium"
                    href="/create_project"
                  >
                    Crie seu projeto
                    <PlusIcon />
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
            <li className="nav-item border rounded me-1">
              <a className="navBtns nav-link fw-medium" href="/categories">
                Categorias
                <TagIcon />
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item border rounded me-1">
                  <a className="navBtns nav-link fw-medium" href="/profile">
                    {profile?.user}
                    <img
                      src={profile?.profilePic}
                      alt="avatar"
                      height="30rem"
                      width="30rem"
                      className="mx-1"
                    ></img>
                  </a>
                </li>
                <li className="nav-item border rounded me-1">
                  <a
                    className="navBtns nav-link fw-medium"
                    href="/"
                    onClick={handleLogout}
                  >
                    Sair
                    <ArrowLeftOnRectangleIcon />
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item border rounded me-1">
                <a className="navBtns nav-link fw-medium" href="/signin">
                  Login
                  <UserCircleIcon />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
