import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bars3BottomLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";
import { commentType } from "../../types/comment";

import "./styles.css";

const Project: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<projectType>();
  const [user, setUser] = useState<userType>();
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [comments, setComments] = useState<commentType[]>([]);
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        // Obter os detalhes do projeto
        const projectResponse = await api.get(`projects/${id}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        // Obter os detalhes dos comentários
        const commentResponse = await api.get(`comments`);
        const sortedComments = commentResponse.data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        setComments(sortedComments);

        // Obter os detalhes do usuário associado ao projeto
        const userId = projectData.userId;
        const userResponse = await api.get(`users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);

        // Obter os detalhes do usuário logado
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

  const handlePostComment = async () => {
    try {
      if (isLoggedIn && project?.id) {
        const formattedDateTime = new Date().toISOString();

        const commentResponse = await api.post("comments", {
          comment,
          user: currentUser?.user,
          createdAt: formattedDateTime,
          userId: currentUser?.id,
          projectId: project?.id,
        });

        // Atualize a lista de comentários após postar um novo
        setComments((prevComments) => [commentResponse.data, ...prevComments]);
        setComment("");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Erro ao postar um comentário:", error);
    }
  };

  function formatCommentTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }

  const handleEditProject = () => {
    navigate(`/edit_project/${project?.id}`);
  };

  return (
    <>
      <Navbar />

      {project && (
        <>
          <h1 className="text-center shadow fw-bolder py-2 my-3">
            {project?.name}
          </h1>
          <div className="container shadow border rounded text-center bg-light bg-gradient my-5 mx-auto">
            <div className="row row-cols-lg-2 row-cols-1 border secondary">
              <div className="col p-0">
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
                    {project.image.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-item${
                          index === 0 ? " active" : ""
                        }`}
                      >
                        <img
                          src={image}
                          className="image-card d-block w-100"
                          alt={project.name}
                        />
                      </div>
                    ))}
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

              <div className="col p-4 border border-1">
                <div className="float-end">
                  {isLoggedIn && isOwner && (
                    <button
                      className="btn btn-info text-light"
                      type="submit"
                      onClick={() => handleEditProject()}
                    >
                      Editar Projeto
                    </button>
                  )}
                </div>
                <div className="m-5 py-3">
                  <u className="text-start fw-medium">Criador: {user?.user}</u>
                  <p className="text-start fw-semibold">
                    Atingido: <span className="text-info">50%</span>
                  </p>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Progress bar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="text-start fw-medium">
                    Meta:{" "}
                    <span className="text-secondary">R$ {project?.goal}</span>
                  </p>
                </div>
                <div className="mx-5">
                  <h2 className="fw-bolder py-4">
                    Arrecadado: <span className="text-info">R$ {project.total}</span>
                  </h2>
                </div>
                <a href={`/project/${project.id}/reward`}>
                  <button
                    className="btn btn-info text-light rounded-pill my-3 py-3 px-3 fs-3 fw-semibold shadow"
                    type="submit"
                  >
                    Financiar projeto
                    <CurrencyDollarIcon className="dollarIcon" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="container shadow p-0 mx-auto">
            <ul
              className="nav nav-pills nav-fill bg-secondary bg-gradient rounded rounded-bottom-0 fw-medium"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item p-0" role="presentation">
                <button
                  className="nav-link border border-dark rounded-end-0 rounded-bottom-0 rounded-top-1 text-light active"
                  type="button"
                  id="pills-about-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-about"
                  role="tab"
                  aria-controls="pills-about"
                  aria-selected="true"
                >
                  Sobre o projeto
                  <Bars3BottomLeftIcon className="navIcons" />
                </button>
              </li>
              <li className="nav-item p-0" role="presentation">
                <button
                  className="nav-link border border-dark rounded-0 text-light"
                  type="button"
                  id="pills-comment-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-comment"
                  role="tab"
                  aria-controls="pills-comment"
                  aria-selected="false"
                >
                  Comentários
                  <ChatBubbleBottomCenterTextIcon className="navIcons" />
                </button>
              </li>
              <li className="nav-item p-0" role="presentation">
                <button
                  className="nav-link border border-dark rounded-start-0 rounded-bottom-0 rounded-top-1 text-light"
                  type="button"
                  id="pills-share-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-share"
                  role="tab"
                  aria-controls="pills-share"
                  aria-selected="false"
                >
                  Compartilhar
                  <ShareIcon className="navIcons" />
                </button>
              </li>
            </ul>

            <div
              className="tab-content bg-light border border-top-0 border-secondary rounded-bottom-1 p-4"
              id="pill-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="pills-about"
                role="tabpanel"
                aria-labelledby="pills-about-tab"
              >
                <h2 className="text-center pb-4 fw-bolder">{project?.name}</h2>
                <p className="text-center fw-medium px-5">
                  {project?.description}
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="pills-comment"
                role="tabpanel"
                aria-labelledby="pills-comment-tab"
              >
                <>
                  <h2 className="text-center pb-4 fw-bolder">
                    Deixe seu comentário
                  </h2>
                  {comments.some((com) => com.projectId === project.id) ? (
                    comments
                      .filter((com) => com.projectId === project.id)
                      .map((com) => (
                        <div className="container my-1 border border-secondary rounded p-3" key={com.id}>
                          <div className="d-flex align-items-start">
                            <p className="mx-2 fs-5 fw-medium">{com.user}</p>
                            <p className="text-secondary mt-1">
                              - {formatCommentTimestamp(com.createdAt)}
                            </p>
                          </div>
                          <div className="commentColor rounded-pill p-1 pt-3 ps-3 w-auto justify-content-center">
                            <p className="text-start fw-medium fs-4">
                              {com.comment}
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="mx-2 py-2 fs-5 border border-secondary rounded text-center fw-medium">
                      Não há comentários.
                    </p>
                  )}
                  <div className="form-floating mt-2">
                    <textarea
                      className="form-control border border-dark border-2"
                      name="comment"
                      id="floatingTextarea"
                      title="comment"
                      value={comment}
                      onChange={(e) => [setComment(e.target.value)]}
                      placeholder="Deixe um comentário"
                    ></textarea>
                    <label
                      className="text-secondary"
                      htmlFor="floatingTextarea"
                    >
                      Deixe um comentário
                    </label>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-info text-light rounded-pill shadow-sm fw-medium fs-4 mt-3 px-5"
                      type="submit"
                      onClick={handlePostComment}
                    >
                      Enviar
                    </button>
                  </div>
                </>
              </div>
              <div
                className="tab-pane fade"
                id="pills-share"
                role="tabpanel"
                aria-labelledby="pills-share-tab"
              >
                <h2 className="text-center pb-4 fw-bolder">
                  Compartilhe este projeto
                </h2>
                <div className="col text-center mx-auto my-auto fs-5 fw-medium">
                  <div className="col pb-2">
                    <ShareIcon className="shareIcon" /> Copie este link: link/
                    {project?.name}
                  </div>
                  <div className="col pb-2">
                    <a className="text-decoration-none text-dark" href="/">
                      <img
                        src={require("../../assets/images/facebook_logo.png")}
                        alt="facebook"
                        width="30"
                        className="me-4"
                      />
                      Facebook: facebook.com/{project?.name}
                    </a>
                  </div>
                  <div className="col pb-2">
                    <a className="text-decoration-none text-dark" href="/">
                      <img
                        src={require("../../assets/images/twitter_logo.png")}
                        alt="twitter"
                        width="30"
                        className="me-4"
                      />
                      Twitter: twitter.com/{project?.name}
                    </a>
                  </div>
                  <div className="col pb-2">
                    <a className="text-decoration-none text-dark" href="/">
                      <img
                        src={require("../../assets/images/linkedin_logo.png")}
                        alt="linkedin"
                        width="30"
                        className="me-4"
                      />
                      Linkedin: linkedin.com/{project?.name}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Project;
