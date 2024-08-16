import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { userType } from "../../types/user";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const Admin: React.FC = () => {
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

  const handleSave = async (id: number, isAdmin: boolean) => {
    try {
      await api.put(`/users/${id}`, { isAdmin });
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar as alterações.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.put(`/users/${id}`, {
        visible: false,
      });
      setAllUsers(allUsers.filter((user) => user.id !== id));
      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir o usuário.");
    }
  };

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
                      <a className="navBtns nav-link fw-medium" href="/finance">
                        Finanças
                        <CurrencyDollarIcon />
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
          Controle de usuários
        </h1>
        {superAdmin ? (
          <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
            {allUsers.map((user) => (
              <div className="card shadow-sm w-100 my-2" key={user.id}>
                <div className="card-body">
                  <div className="row row-cols-2 mb-2">
                    <img
                      src={user.profilePic}
                      alt={`Foto de ${user.user}`}
                      className="imgSize col"
                    />
                    <h5 className="col card-title mt-4">{user.user}</h5>
                  </div>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">
                    Data de Nascimento: {user.birthdate}
                  </p>
                  <p className="card-text">Celular: {user.mobile}</p>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`isAdmin-${user.id}`}
                      checked={user.isAdmin}
                      onChange={(e) => {
                        const updatedUsers = allUsers.map((u: any) =>
                          u.id === user.id
                            ? { ...u, isAdmin: e.target.checked }
                            : u
                        );
                        setAllUsers(updatedUsers);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`isAdmin-${user.id}`}
                    >
                      Moderador
                    </label>
                  </div>
                  <div className="float-end">
                    <button
                      type="button"
                      className="btn btn-info text-light mt-2"
                      onClick={() => handleSave(user.id, user.isAdmin)}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-2 ms-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row text-center mt-5">
            <h2 className="mt-5 fs-1">Você não faz parte da administração!</h2>
            <h3 className="mt-5 fs-2">Por favor. Volte à página inicial.</h3>
            <button
              type="button"
              className="btn btn-info text-light fs-3 mt-5 py-3 mx-auto"
              onClick={() => navigate("/")}
            >
              Voltar à página principal
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
