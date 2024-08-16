import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { userType } from "../../types/user";
import api from "../../utils/api";

const SignInAdmin: React.FC = () => {
  const [userLogin, setUserLogin] = useState<userType>();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setProfilePic("https://i.imgur.com/6zvhinZ.png");
  }, []);

  const handleLoginAdmin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`login`, { user, password });
      const { access_token, user_name } = response.data;

      localStorage.setItem("userToken", access_token);
      localStorage.setItem("userName", user_name);

      navigate("/admin");
    } catch (error) {
      if (!user || !password) {
        setError("Preencha todos os campos!");
        return;
      }
      setError("Informações estão incorretas!");
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <a href="/">
        <img
          src={require("../../assets/images/logo_1.png")}
          alt="Logo do site"
          className="image mx-auto my-5 d-block"
        />
      </a>

      <div
        className="container mx-auto my-5 py-4 px-4 border border-2 bg-light shadow rounded"
        id="containerLogin"
      >
        <h2>
          Login administrativo{" "}
          <ShieldCheckIcon width={"3rem"} color={"black"} />
        </h2>
        <h5 className="my-5">Bem vindo a página administrativa</h5>

        <form method="post" onSubmit={handleLoginAdmin}>
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
          <label className="col mt-3 text-end fw-semibold">
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

export default SignInAdmin;
