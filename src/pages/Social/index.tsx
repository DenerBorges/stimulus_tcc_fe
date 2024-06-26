import React, { useEffect, useState } from "react";
import { projectType } from "../../types/project";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import api from "../../utils/api";

const Social: React.FC = () => {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [social, setSocial] = useState<projectType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filteredSocialProjects = projects.filter(
      (project) => project.category === "Social"
    );
    setSocial(filteredSocialProjects);
  }, [projects]);

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  const defaultImage = require("../../assets/images/default_product.png");

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Projetos da categoria social
        </h1>
        <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
          {social.length === 0
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
            : social.map((project) => {
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
                            href={"/social"}
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

        <Footer />
      </div>
    </>
  );
};

export default Social;
