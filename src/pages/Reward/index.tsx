import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { rewardType } from "../../types/reward";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const Reward: React.FC = () => {
  const { id } = useParams();
  const [rewards, setRewards] = useState<rewardType[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [project, setProject] = useState<projectType>();
  const [user, setUser] = useState<userType>();
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState(10);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        // Obtenha os detalhes do projeto
        const projectResponse = await api.get(`projects/${id}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        // Obtenha os detalhes do usuário associado ao projeto
        const userId = projectData.userId;
        const userResponse = await api.get(`users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);

        // Obtenha os detalhes do usuário logado
        if (isLoggedIn) {
          const profileResponse = await api.get("users/profile");
          const currentUserData = profileResponse.data;
          setCurrentUser(currentUserData);

          if (projectData.userId === currentUserData.id) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        }
      } catch (error) {
        console.error("Erro ao obter dados do projeto:", error);
      }
    };
    fetchData();
  }, [id, isLoggedIn]);

  const getRewards = async () => {
    try {
      const response = await api.get("rewards");
      setRewards([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRewards();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (project?.id) {
        await api.post("rewards", {
          name,
          description,
          value,
          projectId: project.id,
        });
        navigate(0);
      } else {
        console.error("ID do projeto não definido.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReward = async (e: FormEvent) => {
    e.preventDefault();

    if (input <= 0) {
      setError("O valor precisa ser maior que 0!");
      return;
    } else if (!input) {
      setError("Um valor é requerido!");
      return;
    }
  };

  return (
    <>
      <Navbar />

      {project && (
        <>
          <h1 className="text-center shadow fw-bolder py-2 my-3">
            Recompensas
          </h1>
          <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
            <form
              action="#"
              method="get"
              onSubmit={handleReward}
              className="mb-3"
            >
              <label htmlFor="basic-url" className="form-label">
                Doe com um valor personalizado
              </label>
              <div className="input-group">
                <span className="input-group-text">R$</span>
                <input
                  type="number"
                  aria-label="Amount"
                  value={input}
                  onChange={(e) => {
                    setInput(parseInt(e.target.value, 10));
                    setError("");
                  }}
                  className={
                    (error && !input) || input <= 0
                      ? "form-control is invalid"
                      : "form-control"
                  }
                />
                <button type="submit" className="btn btn-info text-light">
                  Confirmar
                </button>
              </div>
              <label className="d-flex flex-column text-danger fw-medium mb-3">
                {error}
              </label>
            </form>
          </div>

          {rewards.map((reward) => {
            if (reward.projectId === project.id) {
              return (
                <div
                  className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5"
                  key={reward.id}
                >
                  <div className="float-end">
                    {isLoggedIn && isOwner && (
                      <button
                        className="btn btn-info text-light"
                        type="submit"
                        onClick={() =>
                          navigate(
                            `/project/${project?.id}/edit_reward/${reward?.id}`
                          )
                        }
                      >
                        Editar Projeto
                      </button>
                    )}
                  </div>
                  <h4 className="fw-medium pb-3">
                    Valor <span className="text-info">R$ {reward.value}</span>
                  </h4>
                  <h5 className="fw-bolder py-2">{reward.name}</h5>
                  <p>{reward.description}</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-info text-light fw-medium rounded-pill shadow px-4 py-2"
                    >
                      Doar R$ {reward.value}
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {isLoggedIn && isOwner && (
            <div className="container bg-light-subtle text-center border border-2 rounded shadow my-5 py-5 px-5">
              <p className="fw-semibold display-6">Criar nova recompensa</p>
              <PlusCircleIcon
                className="plusIcon"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Nova recompensa
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form
                      method="post"
                      className="container"
                      onSubmit={handleSubmit}
                    >
                      <div className="modal-body">
                        <div className="d-flex my-3">
                          <label
                            htmlFor="value"
                            className="form-label p-2 me-4 text-start fw-medium"
                          >
                            Valor:
                          </label>
                          <input
                            type="number"
                            className="form-control flex-grow-1"
                            placeholder="Valor da recompensa"
                            id="value"
                            value={value}
                            onChange={(e) => [setValue(e.target.value)]}
                            required
                          />
                        </div>
                        <div className="d-flex my-3">
                          <label
                            htmlFor="name"
                            className="form-label p-2 me-3 text-start fw-medium"
                          >
                            Nome:
                          </label>
                          <input
                            type="text"
                            className="form-control flex-grow-1"
                            placeholder="Nome da recompensa"
                            id="name"
                            value={name}
                            onChange={(e) => [setName(e.target.value)]}
                            required
                          />
                        </div>
                        <div className="d-flex my-3">
                          <label
                            htmlFor="description"
                            className="form-label p-2 text-start fw-medium"
                          >
                            Descrição:
                          </label>
                          <textarea
                            className="form-control flex-grow-1"
                            placeholder="Descrição da recompensa"
                            id="description"
                            value={description}
                            onChange={(e) => [setDescription(e.target.value)]}
                            maxLength={255}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Fechar
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Criar recompensa
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Reward;
