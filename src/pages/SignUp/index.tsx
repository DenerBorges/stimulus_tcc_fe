import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AtSymbolIcon,
  CakeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import api from "../../utils/api";

import "./styles.css";

const SignUp: React.FC = () => {
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [dateType, setDateType] = useState("text");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  var data = date;
  data = data.replace(/\//g, "-");
  var data_array = data.split("-");

  if (data_array[0].length !== 4 && data_array[0].length <= 4) {
    data = data_array[2] + "-" + data_array[1] + "-" + data_array[0];
  }

  var hoje = new Date();
  var nasc = new Date(data);
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

  useEffect(() => {
    setProfilePic("https://i.imgur.com/6zvhinZ.png");
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !date || !email || !password || !confirmPassword) {
      setError("Error");
      return;
    } else if (idade < 18 || idade > 100) {
      setError("Error");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Error");
      return;
    } else if (password !== confirmPassword) {
      setError("Error");
      return;
    } else if (password.length < 8 && password.length !== 0) {
      setError("Error");
      return;
    }
    try {
      await api.post(`users`, {
        user,
        birthdate: date,
        email,
        password: password,
        profilePic,
      });
      navigate("/signin");
    } catch (error) {
      setEmailError("E-mail já existe.");
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
        <h2>Cadastro</h2>
        <h5 className="my-4">Por favor, efetue o seu cadastro</h5>

        <form method="post" onSubmit={handleRegister}>
          <div className="mb-2">
            <label htmlFor="user" className="form-label fw-semibold">
              Nome de usuário
            </label>
            <div className="containerIcon">
              <input
                type="text"
                id="user"
                aria-describedby="userFeedback"
                value={user}
                onChange={(e) => [setUser(e.target.value), setError("")]}
                className={
                  error && !user ? "form-control is-invalid" : "form-control"
                }
              />
              <UserIcon />
              <div id="userFeedback" className="invalid-feedback fw-medium">
                Preencha o campo de usuário!
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="date" className="form-label fw-semibold">
              Data de nascimento
            </label>
            <div className="containerIcon">
              <input
                type={dateType}
                id="date"
                aria-describedby="dateFeedback"
                value={date}
                onFocus={() => setDateType("date")}
                onChange={(e) => [setDate(e.target.value), setError("")]}
                className={
                  (error && !date) || idade < 18 || idade > 100
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <CakeIcon />
              <div id="dateFeedback" className="invalid-feedback fw-medium">
                Você precisa ter 18 anos ou mais!
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <div className="containerIcon">
              <input
                type="email"
                id="email"
                aria-describedby="emailFeedback"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setError("")]}
                className={
                  (error && !email) ||
                  (!emailRegex.test(email) && email.length !== 0)
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <AtSymbolIcon />
              {emailError !== '' && <div className="text-danger fw-medium">{emailError}</div>}
              <div id="emailFeedback" className="invalid-feedback fw-medium">
                Email inválido!
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label fw-semibold">
              Senha
            </label>
            <div className="containerIcon">
              <input
                type="password"
                id="password"
                aria-describedby="passwordFeedback"
                value={password}
                onChange={(e) => [setPassword(e.target.value), setError("")]}
                className={
                  (error && !password) ||
                  (password.length < 8 && password.length !== 0)
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <LockClosedIcon />
              <div id="passwordFeedback" className="invalid-feedback fw-medium">
                A senha deve contar no mínimo 8 caracteres!
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Confirmar senha
            </label>
            <div className="containerIcon">
              <input
                type="password"
                id="confirmPassword"
                aria-describedby="confirmPasswordFeedback"
                value={confirmPassword}
                onChange={(e) => [
                  setConfirmPassword(e.target.value),
                  setError(""),
                ]}
                className={
                  (error && !confirmPassword) || password !== confirmPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <ShieldCheckIcon />
              <div
                id="confirmPasswordFeedback"
                className="invalid-feedback fw-medium"
              >
                Senhas não correspondem!
              </div>
            </div>
          </div>
          <button type="submit" className="btn mt-1 btn-primary fw-semibold">
            Registre-se
          </button>
        </form>

        <label className="my-1 fw-semibold">
          Já possui uma conta?
          <strong className="fw-semibold">
            &nbsp;<Link to="/signin">Faça Login</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default SignUp;
