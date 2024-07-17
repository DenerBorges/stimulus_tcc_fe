import React, { useEffect, useState } from "react";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [moderator, setModerator] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [highlightedProjects, setHighlightedProjects] = useState<projectType[]>(
    []
  );
  const [visibleHighlighted, setVisibleHighlighted] = useState(4);
  const [categories, setCategories] = useState<{
    [key: string]: projectType[];
  }>({});
  const [visibleProjects, setVisibleProjects] = useState<{
    [key: string]: number;
  }>({});

  const getProjects = async () => {
    try {
      const response = await api.get("projects");
      const allProjects = response.data;

      allProjects.sort((a: projectType, b: projectType) => a.id - b.id);

      setProjects(allProjects);

      const highlighted = allProjects.filter(
        (project: projectType) => project.deadline
      );
      setHighlightedProjects(highlighted);

      const categorized = allProjects.reduce(
        (acc: { [key: string]: projectType[] }, project: projectType) => {
          if (!acc[project.category]) {
            acc[project.category] = [];
          }
          acc[project.category].push(project);
          return acc;
        },
        {}
      );

      Object.keys(categorized).forEach((category) => {
        categorized[category].sort(
          (a: projectType, b: projectType) => a.id - b.id
        );
      });

      setCategories(categorized);

      const initialVisibleProjects = Object.keys(categorized).reduce(
        (acc, category) => {
          acc[category] = 4;
          return acc;
        },
        {} as { [key: string]: number }
      );
      setVisibleProjects(initialVisibleProjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();

    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const profileResponse = await api.get("users/profile");
          const currentUserData = profileResponse.data;
          setCurrentUser(currentUserData);
        }
        if (currentUser?.isAdmin === true) {
          setModerator(true);
        }
      } catch (error) {
        console.error("Erro ao obter dados do projeto:", error);
      }
    };
    fetchData();
  }, [currentUser?.isAdmin, isLoggedIn]);

  const loadMoreHighlighted = () => {
    setVisibleHighlighted((prev) => prev + 4);
  };

  const loadMoreProjects = (category: string) => {
    setVisibleProjects((prevVisibleProjects) => ({
      ...prevVisibleProjects,
      [category]: prevVisibleProjects[category] + 4,
    }));
  };

  const isBase64Image = (image?: string) => {
    return image && !image.startsWith("http");
  };

  const defaultImage = require("../../assets/images/default_product.png");

  const renderProjects = (
    projects: projectType[],
    visibleCount: number,
    category?: string
  ) => {
    let sortedProjects = [...projects];
    if (moderator) {
      sortedProjects.sort((a, b) => b.report - a.report || a.id - b.id);
    } else {
      sortedProjects.sort((a, b) => a.id - b.id);
    }

    return sortedProjects.length === 0
      ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
      : sortedProjects.slice(0, visibleCount).map((project) => {
          const progress = Math.min((project.total / project.goal) * 100, 100);
          const progressBarColor = progress === 100 ? "bg-success" : "bg-info";
          const borderClass =
            moderator && project.report > 0 ? "border-danger border-4" : "";
          return (
            <div className="col" key={project.id}>
              <div className={`card shadow-sm h-100 ${borderClass}`}>
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
                    <h5 className="card-title text-center">{project.name}</h5>
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
        });
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Projetos em destaque
        </h1>
        <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
          {renderProjects(highlightedProjects, visibleHighlighted)}
        </div>
        {visibleHighlighted < highlightedProjects.length && (
          <div className="text-center my-3">
            <button
              type="button"
              className="btn btn-info text-light fw-semibold fs-5 rounded-pill"
              onClick={loadMoreHighlighted}
            >
              Carregar mais
            </button>
          </div>
        )}

        {Object.keys(categories)
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <div key={category}>
              <h2 className="text-center shadow fw-bolder py-2 my-3">{`Projetos em destaque da categoria ${category}`}</h2>
              <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
                {renderProjects(
                  categories[category],
                  visibleProjects[category],
                  category
                )}
              </div>
              {visibleProjects[category] < categories[category].length && (
                <div className="text-center my-3">
                  <button
                    type="button"
                    className="btn btn-info text-light fw-semibold fs-5 rounded-pill"
                    onClick={() => loadMoreProjects(category)}
                  >
                    Carregar mais
                  </button>
                </div>
              )}
            </div>
          ))}

        <Footer />
      </div>
    </>
  );
};

export default Home;
