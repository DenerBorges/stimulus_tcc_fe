import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const CreateProject: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [image, setImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoggedIn) {
      try {
        const response = await api.get("users/profile");
        const loged = response.data;

        const selectedFiles = document.getElementById(
          "formFileMultiple"
        ) as HTMLInputElement;
        const fileList = selectedFiles.files;

        if (fileList && fileList.length > 0) {
          const imageFileNames = [];

          for (let i = 0; i < fileList.length; i++) {
            imageFileNames.push(fileList[i].name);
          }

          await api.post("projects", {
            name,
            description,
            category,
            goal,
            deadline,
            image: imageFileNames,
            userId: loged.id,
          });
          navigate("/");
        } else {
          console.log("Nenhum arquivo selecionado.");
        }
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
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome do projeto"
              id="name"
              value={name}
              onChange={(e) => [setName(e.target.value)]}
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
              value={description}
              onChange={(e) => [setDescription(e.target.value)]}
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
              value={goal}
              onChange={(e) => {
                setGoal(parseInt(e.target.value, 0));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label fw-medium">
              Data de expiração do projeto (dias)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Dias de expiração"
              id="deadline"
              value={deadline}
              onChange={(e) => {
                setDeadline(parseInt(e.target.value, 0));
              }}
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
              accept="image/*"
              value={image}
              onChange={(e) => [setImage(e.target.value)]}
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
