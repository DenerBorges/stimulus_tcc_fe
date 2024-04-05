import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const CreateProject: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);
  const [goal, setGoal] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.length < 10) {
      setError("Error");
      return;
    } else if (goal < 100) {
      setError("Error");
      return;
    } else if (deadline < 100) {
      setError("Error");
      return;
    } else if (isLoggedIn) {
      try {
        const response = await api.get("users/profile");
        const loged = response.data;

        await api.post("projects", {
          name,
          description,
          category,
          total,
          goal,
          deadline,
          userId: loged.id,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Criar seu Projeto
      </h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder">
          Formulário de criação de projeto
        </h2>
        <div className="alert alert-warning mt-5" role="alert">
          <ExclamationCircleIcon />
          Atenção! Altere a imagem do seu projeto atualizando-o na página do seu projeto.
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome do projeto"
              id="name"
              value={name}
              onChange={(e) => [setName(e.target.value)]}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-medium">
              Descrição
            </label>
            <textarea
              placeholder="Descrição do seu projeto"
              id="description"
              aria-describedby="descriptionFeedback"
              value={description}
              onChange={(e) => [setDescription(e.target.value)]}
              className={
                error && description.length < 10
                  ? "form-control is-invalid"
                  : "form-control"
              }
              required
            ></textarea>
            <div
              id="descriptionFeedback"
              className="invalid-feedback fw-medium"
            >
              A descrição deve conter mais de 10 caracteres!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="goal" className="form-label fw-medium">
              Meta
            </label>
            <input
              type="number"
              placeholder="Meta de valor"
              id="goal"
              aria-describedby="goalFeedback"
              value={goal}
              onChange={(e) => {
                setGoal(parseInt(e.target.value, 0));
              }}
              className={
                error && goal < 100 ? "form-control is-invalid" : "form-control"
              }
              required
            />
            <div id="goalFeedback" className="invalid-feedback fw-medium">
              O valor da meta deve ser maior ou igual a 100!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label fw-medium">
              Data de expiração do projeto (dias)
            </label>
            <input
              type="number"
              placeholder="Dias de expiração"
              id="deadline"
              aria-describedby="deadlineFeedback"
              value={deadline}
              onChange={(e) => {
                setDeadline(parseInt(e.target.value, 0));
              }}
              className={
                error && deadline < 100
                  ? "form-control is-invalid"
                  : "form-control"
              }
              required
            />
            <div id="deadlineFeedback" className="invalid-feedback fw-medium">
              O valor de dias de expiração deve ser maior ou igual a 100!
            </div>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Selecione a categoria
              </option>
              <option value="Arte">Arte</option>
              <option value="Gastronomia">Gastronomia</option>
              <option value="Jogo">Jogo</option>
              <option value="Livro">Livro</option>
              <option value="Música">Música</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Outros">Outros</option>
            </select>
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
