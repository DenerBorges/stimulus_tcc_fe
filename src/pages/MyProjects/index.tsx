import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";

const MyProjects: React.FC = () => {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the currently logged-in user's profile
        const profileResponse = await api.get("users/profile");
        const currentUserData = profileResponse.data;
        setCurrentUser(currentUserData);

        // Fetch all projects
        const projectsResponse = await api.get("projects");
        const allProjects = projectsResponse.data;

        // Filter projects to show only those owned by the current user
        const userProjects = allProjects.filter(
          (project: projectType) => project.userId === currentUserData.id
        );

        setProjects(userProjects);
        setIsOwner(userProjects.length > 0);
      } catch (error) {
        console.error("Erro ao obter os dados do usuário ou projetos:", error);
      }
    };

    fetchUserData();
  }, []);

  const isBase64Image = (image?: string) => {
    return image && !image.startsWith("http");
  };

  const defaultImage = require("../../assets/images/default_product.png");

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Meus projetos criados
        </h1>
        <div className="main-content container">
          {isOwner && projects.length === 0 ? (
            <h4 className="text-center fw-bolder mb-5">
              Nenhum projeto encontrado.
            </h4>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
              {isOwner &&
                projects.map((project) => {
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
      </div>
    </>
  );
};

export default MyProjects;
