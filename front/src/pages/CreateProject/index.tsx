import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./styles.css";

const CreateProject: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    navigate("/reward");
  }

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Criar seu Projeto
      </h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder">Formulário de criação de projeto</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome do projeto"
              id="name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-medium">
              Descrição
            </label>
            <textarea
              className="form-control"
              placeholder="Descrição do seu projeto"
              id="description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="goal" className="form-label fw-medium">
              Meta
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Meta de valor"
              id="goal"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-medium">
              Categoria
            </label>
            <select
              className="form-select"
              id="category"
              aria-label="Select Category"
              required
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Selecione a categoria
              </option>
              <option value="1">Arte</option>
              <option value="2">Gastronomia</option>
              <option value="3">Jogo</option>
              <option value="4">Livro</option>
              <option value="5">Música</option>
              <option value="6">Tecnologia</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label fw-medium">
              Selecione imagens
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              required
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <button
              type="submit"
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-5 py-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateProject;
