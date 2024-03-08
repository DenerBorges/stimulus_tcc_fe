import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { rewardType } from "../../types/reward";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const EditReward: React.FC = () => {
  const { id } = useParams();
  const [reward, setReward] = useState<rewardType>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const getReward = async () => {
    try {
      const response = await api.get(`rewards/${id}`);
      setReward(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setValue(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReward();
  }, []);

  const handleUpdateReward = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`rewards/${reward?.id}`, {
        name,
        description,
        value,
      });

      toast.success("Recompensa atualizada com sucesso!\nParabéns!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });

      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      toast.error(
        "Um erro ocorreu ao atualizar a recompensa.\nPor favor tente novamente."
      );
    }
  };

  const handleDeleteReward = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir sua recompensa? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`rewards/${reward?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir a recompensa: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Editar Recompensa</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações da recompensa</h2>
        <form method="post" key={reward?.id}>
          <div className="my-4">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome da recompensa"
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
              placeholder="Descrição da recompensa"
              id="description"
              value={description}
              onChange={(e) => [setDescription(e.target.value)]}
              maxLength={255}
              required
            ></textarea>
          </div>
          <div className="my-4">
            <label htmlFor="value" className="form-label fw-medium">
              Valor:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Valor da recompensa"
              id="value"
              value={value}
              onChange={(e) => [setValue(e.target.value)]}
              required
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
            <button
              type="submit"
              onClick={handleUpdateReward}
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Atualizar recompensa
            </button>
            <button
              type="submit"
              onClick={handleDeleteReward}
              className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Excluir recompensa
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />

      <Footer />
    </>
  );
};

export default EditReward;
