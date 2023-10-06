import React, { useEffect, useState } from "react";
import { projectType } from "../../types/project";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import api from "../../utils/api";

const Book: React.FC = () => {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [book, setBook] = useState<projectType[]>([]);

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
    const filteredBookProjects = projects.filter(
      (project) => project.category === "Livro"
    );
    setBook(filteredBookProjects);
  }, [projects]);

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Projetos da categoria livro
      </h1>
      <div className="container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
        {projects.length === 0
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          : book.map((project) => (
              <div className="col" key={project.id}>
                <div className="card shadow-sm h-100">
                  <a href={`/project/${project.id}`}>
                    <img
                      src={project.image[0]}
                      className="card-img-top border secondary"
                      alt="imagem do projeto"
                    />
                  </a>
                  <div className="card-body border secondary">
                    <h5 className="card-title text-center">{project.name}</h5>
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
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                    <div className="row pt-2">
                      <div className="col pe-0">
                        <small>25 %</small>
                      </div>
                      <div className="col p-0">
                        <small>{project.deadline} dias restantes</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <Footer />
    </>
  );
};

export default Book;
