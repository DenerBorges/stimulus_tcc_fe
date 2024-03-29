import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

import "./styles.css";
import api from "../../utils/api";

const SignIn: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`login`, { user, password });
      const { access_token, user_name } = response.data;

      localStorage.setItem("userToken", access_token);
      localStorage.setItem("userName", user_name);
      navigate("/");
    } catch (error) {
      if (!user || !password) {
        setError("Preencha todos os campos!");
        return;
      }
      setError("Seu usuário ou senha estão incorretos!");
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <img
        src={require("../../assets/images/logo_1.png")}
        alt="Logo do site"
        className="image mx-auto my-5 d-block"
      />

      <div
        className="container mx-auto my-5 py-4 px-4 border border-2 bg-light shadow rounded"
        id="containerLogin"
      >
        <h2>Login</h2>
        <h5 className="my-5">Por favor, efetue o login</h5>

        <form method="post" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label fw-semibold">
              Nome de usuário
            </label>
            <div className="containerIcon">
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => [setUser(e.target.value), setError("")]}
                className={
                  error && !user ? "form-control is-invalid" : "form-control"
                }
              />
              <UserIcon />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Senha
            </label>
            <div className="containerIcon">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => [setPassword(e.target.value), setError("")]}
                className={
                  error && !password
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <LockClosedIcon />
            </div>
          </div>
          <label className="d-flex flex-column text-danger fw-medium mb-3">
            {error}
          </label>
          <button type="submit" className="btn btn-primary fw-semibold">
            Logar-se
          </button>
        </form>

        <div className="row">
          <label className="col my-3 fw-semibold">
            Novo por aqui?
            <strong className="fw-semibold">
              &nbsp;<Link to="/signup">Registre-se</Link>
            </strong>
          </label>
          <label className="col my-3 text-end fw-semibold">
            <label>
              <Link
                className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/forgot_password"
              >
                Esqueceu a senha?
              </Link>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
