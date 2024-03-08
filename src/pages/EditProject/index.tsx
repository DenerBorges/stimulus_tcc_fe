import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectType } from "../../types/project";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const EditProject: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<projectType>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<FileList | null>();

  const navigate = useNavigate();

  const getProject = async () => {
    try {
      const response = await api.get(`projects/${id}`);
      setProject(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const handleUpdateProject = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      await api.put(`projects/${project?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getProject();

      toast.success("Projeto atualizado com sucesso!\nParabéns!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });

      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      toast.error(
        "Um erro ocorreu ao atualizar o projeto.\nPor favor tente novamente."
      );
    }
  };

  const handleDeleteProject = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir seu projeto? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`projects/${project?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir o projeto: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Editar Projeto</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do projeto</h2>
        <div className="alert alert-warning" role="alert">
          <ExclamationCircleIcon />
          Atenção! Se desejar editar os valores de meta ou data de expiração
          será necessário a criação de um novo projeto.
        </div>
        <form method="post" key={project?.id}>
          <div className="my-4">
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
          <div className="my-4">
            <label htmlFor="description" className="form-label fw-medium">
              Descrição
            </label>
            <textarea
              className="form-control"
              placeholder="Descrição do seu projeto"
              id="description"
              value={description}
              onChange={(e) => [setDescription(e.target.value)]}
              maxLength={255}
              required
            ></textarea>
          </div>
          <div className="my-4">
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
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
            <button
              type="submit"
              onClick={handleUpdateProject}
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Atualizar projeto
            </button>
            <button
              type="submit"
              onClick={handleDeleteProject}
              className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Excluir projeto
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />

      <Footer />
    </>
  );
};

export default EditProject;
