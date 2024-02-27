import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const { email } = location.state;
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8 && password.length !== 0) {
      setError("Error");
      return;
    }
    try {
      await api.post("reset-password", {
        email,
        resetCode,
        password,
      });
      toast.success("Senha alterada com sucesso!\nRedirecionando para login", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (error) {
      toast.error(
        "O código de recuperação está errado. Por favor tente novamente."
      );
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
        <h2>Resetar senha</h2>
        <h5 className="my-5">Digite seu código e a nova senha</h5>

        <form method="post" onSubmit={handleReset}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label fw-semibold">
              Código
            </label>
            <div className="containerIcon">
              <input
                type="text"
                id="code"
                value={resetCode}
                onChange={(e) => [setResetCode(e.target.value), setError("")]}
                className={
                  error && !resetCode
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Nova senha
            </label>
            <div className="containerIcon">
              <input
                type="password"
                id="password"
                aria-describedby="passwordFeedback"
                value={password}
                onChange={(e) => [setPassword(e.target.value), setError("")]}
                className={
                  (error && !password) || (error && password.length !== 0)
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <div id="passwordFeedback" className="invalid-feedback fw-medium">
                A senha deve contar no mínimo 8 caracteres!
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary fw-semibold">
            Enviar
          </button>
        </form>
      </div>
      <ToastContainer autoClose={3000} className="custom-toast" />
    </div>
  );
};

export default ResetPassword;
