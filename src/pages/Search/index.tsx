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
                    <div className="card shadow-sm h-75">
                      <a href={`/project/${project.id}`}>
                        <img
                          src={project.image[0]}
                          className="card-img-top border secondary"
                          alt={project.name}
                        />
                      </a>
                      <div className="card-body border secondary">
                        <h5 className="card-title text-center">
                          {project.name}
                        </h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {project.category}
                          </small>
                        </p>
                        <p className="card-text">{project.description}</p>
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
                        <img
                          src={project.image[0]}
                          className="card-img-top border secondary"
                          alt={project.name}
                        />
                      </a>
                      <div className="card-body border secondary">
                        <h5 className="card-title text-center">
                          {project.name}
                        </h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {project.category}
                          </small>
                        </p>
                        <p className="card-text">{project.description}</p>
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
