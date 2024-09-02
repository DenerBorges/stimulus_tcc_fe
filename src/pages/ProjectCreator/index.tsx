import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userType } from "../../types/user";
import { projectType } from "../../types/project";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

const ProjectCreator: React.FC = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<projectType[]>([]);
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`users/${id}`);
        const userData = userResponse.data;
        setUser(userData);
      } catch (error) {
        console.error("Erro ao obter detalhes do usuário:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsResponse = await api.get(`projects`);
        const allProjects = projectsResponse.data;

        const userIdNumber = typeof id === "string" ? parseInt(id, 10) : id;
        const userProjects = allProjects.filter(
          (project: projectType) => project.userId === userIdNumber
        );
        setProjects(userProjects);
      } catch (error) {
        console.error("Erro ao obter projetos:", error);
      }
    };

    fetchUserData();
    fetchProjects();
  }, [id]);

  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  const defaultImage = require("../../assets/images/default_product.png");

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Criador do Projeto
      </h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do usuário</h2>
        <form className="row" method="post" key={user?.id}>
          <div className="container col-md-6 offset-md-3 text-center mb-4">
            <img src={user?.profilePic} alt="Foto de Perfil" width={"200rem"} />
          </div>
          <div className="text-center fs-1 fw-semibold mb-4">{user?.user}</div>
          <div className="text-center fs-3">{user?.email}</div>
          <div className="text-center fs-4">
            Ativo no Stimulus desde: {formatDate(user?.createdAt!)}
          </div>
        </form>
      </div>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Projetos deste usuário</h2>
        {projects.length === 0 ? (
          <h4 className="text-center fw-bolder mb-5">
            Nenhum projeto para mostrar.
          </h4>
        ) : (
          <div className="container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
            {projects.map((project) => {
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
      </div>

      <Footer />
    </>
  );
};

export default ProjectCreator;
