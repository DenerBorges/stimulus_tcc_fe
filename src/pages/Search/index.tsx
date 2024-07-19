import React, { useEffect, useState } from "react";
import { projectType } from "../../types/project";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Search: React.FC = () => {
  const [results, setResults] = useState<projectType[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    api
      .get(`/projects/search?name=${query}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Erro na pesquisa:", error);
      });
  }, [query]);

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  const defaultImage = require("../../assets/images/default_product.png");

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Resultado da pesquisa: <span className="fw-medium">"{query}"</span>
        </h1>
        {results.length === 0 ? (
          <h2 className="main-content text-center fw-bolder my-5">
            Nenhum resultado encontrado!
          </h2>
        ) : results.length < 5 ? (
          <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
            {results
              .sort((a, b) => a.id - b.id)
              .map((project) => {
                const progress = Math.min(
                  (project.total / project.goal) * 100,
                  100
                );
                const progressBarColor =
                  progress === 100 ? "bg-success" : "bg-info";
                return (
                  <div className="col" key={project.id}>
                    <div className="card shadow-sm h-100">
                      <a href={`/project/${project.id}`}>
                        {!isBase64Image(project.image[0]) ? (
                          <img
                            src={
                              project.image.length > 0
                                ? project.image[0]
                                : defaultImage
                            }
                            className="card-img-top border secondary"
                            alt={project.name}
                          />
                        ) : (
                          <img
                            src={`data:image/jpeg;base64,${project.image[0]}`}
                            className="card-img-top border secondary"
                            alt={project.name}
                          />
                        )}
                      </a>
                      <div className="d-flex flex-column card-body">
                        <div className="mb-auto pb-2">
                          <h5 className="card-title text-center">
                            {project.name}
                          </h5>
                          <a
                            className="category-link card-text"
                            href={(() => {
                              let categoryPath = "/";
                              if (project.category === "Arte") {
                                categoryPath = "/art";
                              } else if (project.category === "Gastronomia") {
                                categoryPath = "/gastronomy";
                              } else if (project.category === "Jogo") {
                                categoryPath = "/game";
                              } else if (project.category === "Livro") {
                                categoryPath = "/book";
                              } else if (project.category === "Música") {
                                categoryPath = "/music";
                              } else if (project.category === "Social") {
                                categoryPath = "/social";
                              } else if (project.category === "Tecnologia") {
                                categoryPath = "/technology";
                              } else if (project.category === "Outros") {
                                categoryPath = "/others";
                              }

                              return categoryPath;
                            })()}
                          >
                            <small>{project.category}</small>
                          </a>
                          <p className="card-text">{project.description}</p>
                        </div>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className={`progress-bar ${progressBarColor}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="row pt-2">
                          <div className="col pe-0">
                            <small>{`${progress.toFixed(0)} %`}</small>
                          </div>
                          <div className="col p-0">
                            <small>{project.deadline} dias restantes</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
            {results
              .sort((a, b) => a.id - b.id)
              .map((project) => {
                const progress = Math.min(
                  (project.total / project.goal) * 100,
                  100
                );
                const progressBarColor =
                  progress === 100 ? "bg-success" : "bg-info";
                return (
                  <div className="col" key={project.id}>
                    <div className="card shadow-sm h-100">
                      <a href={`/project/${project.id}`}>
                        {!isBase64Image(project.image[0]) ? (
                          <img
                            src={
                              project.image.length > 0
                                ? project.image[0]
                                : defaultImage
                            }
                            className="card-img-top border secondary"
                            alt={project.name}
                          />
                        ) : (
                          <img
                            src={`data:image/jpeg;base64,${project.image[0]}`}
                            className="card-img-top border secondary"
                            alt={project.name}
                          />
                        )}
                      </a>
                      <div className="d-flex flex-column card-body">
                        <div className="mb-auto pb-2">
                          <h5 className="card-title text-center">
                            {project.name}
                          </h5>
                          <a
                            className="category-link card-text"
                            href={(() => {
                              let categoryPath = "/";
                              if (project.category === "Arte") {
                                categoryPath = "/art";
                              } else if (project.category === "Gastronomia") {
                                categoryPath = "/gastronomy";
                              } else if (project.category === "Jogo") {
                                categoryPath = "/game";
                              } else if (project.category === "Livro") {
                                categoryPath = "/book";
                              } else if (project.category === "Música") {
                                categoryPath = "/music";
                              } else if (project.category === "Social") {
                                categoryPath = "/social";
                              } else if (project.category === "Tecnologia") {
                                categoryPath = "/technology";
                              } else if (project.category === "Outros") {
                                categoryPath = "/others";
                              }

                              return categoryPath;
                            })()}
                          >
                            <small>{project.category}</small>
                          </a>
                          <p className="card-text">{project.description}</p>
                        </div>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className={`progress-bar ${progressBarColor}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="row pt-2">
                          <div className="col pe-0">
                            <small>{`${progress.toFixed(0)} %`}</small>
                          </div>
                          <div className="col p-0">
                            <small>{project.deadline} dias restantes</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Search;
