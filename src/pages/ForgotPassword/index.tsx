import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Error");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Error");
      return;
    }
    try {
      await api.post(`forgot-password`, {
        email,
      });
      toast.success(
        "Código de recuperação de senha enviado para seu email com sucesso!",
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
          className: "custom-toast",
        }
      );
      setTimeout(() => {
        navigate("/reset_password", { state: { email } });
      }, 4000);
    } catch (error) {
      toast.error("O email não foi encontrado. Verifique e tente novamente.");
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
        <h2>Recuperar senha</h2>
        <h5 className="my-5">
          Digite seu email para obter o código de troca de senha
        </h5>

        <form method="post" onSubmit={handleEmail}>
          <div className="mt-5 mb-4">
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
              <div id="emailFeedback" className="invalid-feedback fw-medium">
                Email inválido!
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary my-3 fw-semibold">
            Enviar
          </button>
        </form>
      </div>
      <ToastContainer autoClose={3000} className="custom-toast" />
    </div>
  );
};

export default ForgotPassword;
