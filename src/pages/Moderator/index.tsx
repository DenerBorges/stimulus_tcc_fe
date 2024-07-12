import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { projectType } from "../../types/project";
import api from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Moderator: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<projectType>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await api.get(`projects/${id}`);
        const projectData = projectResponse.data;
        setProject(projectData);
      } catch (error) {
        console.error("Erro ao obter dados do projeto:", error);
      }
    };
    fetchData();
  }, []);

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  const defaultImage = require("../../assets/images/default_product.png");

  const disregardReport = async () => {
    const disregard = window.confirm(
      "Tem certeza de que deseja desconsiderar e retirar a(s) denúncia(s) deste projeto?"
    );

    if (disregard) {
      try {
        await api.put(`projects/${id}`, {
          report: 0,
          reportMessages: [],
        });
        toast.success("Denúncia desconsiderada com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        console.error("Erro ao desconsiderar denúncia(s): ", error);
      }
    }
  };

  const suspendProject = async () => {
    const suspend = window.confirm(
      "Tem certeza de que deseja suspender este projeto?"
    );

    if (suspend) {
      try {
        await api.put(`projects/${id}`, {
          visible: false,
          report: 0,
          reportMessages: [],
        });
        toast.success("Projeto suspenso com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        console.error("Erro ao suspender projeto: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      {project && (
        <>
          <h1 className="text-center shadow fw-bolder py-2 my-3">
            Página de moderação
          </h1>
          <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
            <div className="text-center my-5 mx-auto">
              <div className="row">
                <div className="col p-0"></div>
                <div className="col-3 col-lg-7 col-md-10 col-12 p-0">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel carousel-dark slide"
                  >
                    <div className="carousel-indicators">
                      {project.image.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-label="Slide"
                          aria-current="true"
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {project && project.image && project.image.length > 0 ? (
                        project.image.map((image, index) => (
                          <div
                            key={index}
                            className={`carousel-item${
                              index === 0 ? " active" : ""
                            }`}
                          >
                            {!isBase64Image(image) ? (
                              <img
                                src={image}
                                className="image-card d-block w-100"
                                alt={project.name}
                              />
                            ) : (
                              <img
                                src={`data:image/jpeg;base64,${image}`}
                                className="image-card d-block w-100"
                                alt={project.name}
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="carousel-item active">
                          <img
                            src={defaultImage}
                            className="image-card d-block w-100"
                            alt="Imagem Padrão"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col p-0"></div>
              </div>
              <div className="row mt-5">
                <div className="col p-0"></div>
                <div className="col-3 col-lg-7 col-md-10 col-12 p-0">
                  <p className="fs-2 fw-semibold">
                    Nome do projeto:{" "}
                    <span className="fw-bold">{project.name}</span>
                  </p>
                  <p className="fs-4 fw-semibold">
                    Categoria do projeto:{" "}
                    <span className="fw-bold">{project.category}</span>
                  </p>
                  <p className="fs-4 fw-semibold">
                    Total doado para o projeto:{" "}
                    <span className="fw-bold">{project.total}</span>
                  </p>
                  <p className="fs-4 fw-semibold">
                    Meta do projeto:{" "}
                    <span className="fw-bold">{project.goal}</span>
                  </p>
                  <div className="bg-danger-subtle border border-danger border-2 rounded shadow my-5 py-5 px-5">
                    <p className="fs-4 fw-semibold">
                      Número de denúncia(s):{" "}
                      <span className="fw-bold">{project.report}</span>
                    </p>
                    <p className="fs-4 fw-semibold">
                      Motivo(s) da(s) denúncia(s):
                    </p>
                    <ul>
                      {project.reportMessages.map((message, index) => (
                        <li key={index} className="fs-5 fw-semibold">
                          {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-5">
                    <button
                      type="submit"
                      onClick={() => disregardReport()}
                      className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
                    >
                      Desconsiderar denúncia(s)
                    </button>
                    <button
                      type="submit"
                      onClick={() => suspendProject()}
                      className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
                    >
                      Suspender este projeto
                    </button>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
                    <button
                      type="button"
                      className="btn btn-secondary text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
                      disabled
                    >
                      Contatar autor do projeto
                    </button>
                  </div>
                </div>
                <div className="col p-0"></div>
              </div>
            </div>
          </div>
          <ToastContainer autoClose={3000} className="custom-toast" />

          <Footer />
        </>
      )}
    </>
  );
};

export default Moderator;
