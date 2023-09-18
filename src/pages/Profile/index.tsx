import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./styles.css";

const Profile: React.FC = () => {
  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Perfil</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do usuário</h2>
        <div className="row mx-0 mb-5 fw-medium">
          <label htmlFor="name" className="w-25 me-5 px-0 pt-2 fw-medium">
            Nome:
          </label>
          <input
            className="col-1 form-control w-25"
            id="name"
            type="text"
            value={"Nome da Pessoa"}
            required
          />
        </div>
        <div className="row mx-0 mb-5 fw-medium">
          <label htmlFor="email" className="w-25 me-5 px-0 pt-2 fw-medium">
            Email:
          </label>
          <input
            className="col-1 form-control w-25"
            id="email"
            type="email"
            value={"nome@email.com"}
            required
          />
        </div>
        <div className="row mx-0 mb-5 fw-medium">
          <label htmlFor="address" className="w-25 me-5 px-0 pt-2 fw-medium">
            Endereço:
          </label>
          <input
            className="col-1 form-control w-25"
            id="address"
            type="text"
            value={"Rua endereço - 100"}
            required
          />
        </div>
        <div className="row mx-0 mb-5 fw-medium">
          <label htmlFor="password" className="w-25 me-5 px-0 pt-2 fw-medium">
            Senha:
          </label>
          <input
            className="col-1 form-control w-25"
            id="password"
            type="password"
            value={"12345678"}
            required
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button
            type="button"
            className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
          >
            Atualizar perfil
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
