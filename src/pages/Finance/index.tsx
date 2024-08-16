import React, { useEffect, useState } from "react";
import { userType } from "../../types/user";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import api from "../../utils/api";
import Footer from "../../components/Footer";

const Finance: React.FC = () => {
  const [profile, setProfile] = useState<userType>();
  const [allUsers, setAllUsers] = useState<userType[]>([]);
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

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

        const fetchUsers = async () => {
          try {
            const response = await api.get("users");
            setAllUsers(response.data);
          } catch (error) {
            console.error("Erro ao buscar usuários", error);
          }
        };

        fetchUsers();

        const fetchData = async () => {
          try {
            if (isLoggedIn) {
              const profileResponse = await api.get("users/profile");
              const currentUserData = profileResponse.data;
              setCurrentUser(currentUserData);
            }
            if (currentUser?.isSuperAdmin === true) {
              setSuperAdmin(true);
            }
          } catch (error) {
            console.error("O usuário não é administrador:", error);
            navigate("/");
          }
        };
        fetchData();
      }
    };
    getProfile();
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, [currentUser?.isSuperAdmin, isLoggedIn, navigate]);

  return (
    <>
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
            <p className="text-light text-center fs-4 fw-bolder mt-3 mx-auto">
              Bem-vindo à página administrativa
            </p>
            <ul className="navbar-nav mt-2  d-flex justify-content-end">
              {isLoggedIn ? (
                <>
                  {superAdmin ? (
                    <li className="nav-item border rounded me-1">
                      <a className="navBtns nav-link fw-medium" href="/admin">
                        Controle de usuários
                        <UserCircleIcon />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
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
                  <a className="navBtns nav-link fw-medium" href="/signinadmin">
                    Login
                    <UserCircleIcon />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Controle de finanças
        </h1>
        <div className="main-content container mx-auto my-5">
          <div className="row bg-white border p-5 mb-5 mx-auto">
            <h2 className="col text-success fw-bold fs-1">Valor Aprovado: R$675</h2>
            <h2 className="col text-danger fw-bold fs-1">Valor em Análise: R$630</h2>
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome do usuário</th>
                <th scope="col">Valor doado</th>
                <th scope="col">Aprovado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>João Chagas</td>
                <td>R$ 150</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Flávia Amorin</td>
                <td>R$ 45</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault2"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault2"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Dener Borges</td>
                <td>R$ 145</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault3"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault3"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Flávia Amorin</td>
                <td>R$ 200</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault4"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault4"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Carlos Almeida</td>
                <td>R$ 350</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault5"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault5"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Dener Borges</td>
                <td>R$ 135</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault6"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault6"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>João Chagas</td>
                <td>R$ 280</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault7"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault7"
                    >
                      {""}
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Finance;
