import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRightCircleIcon,
  Bars3BottomLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ShareIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";
import { commentType } from "../../types/comment";
import { donationType } from "../../types/donation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const Project: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<projectType>();
  const [currentSection, setCurrentSection] = useState("reason");
  const [reportMsg, setReportMsg] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState<userType>();
  const [allUser, setAllUser] = useState<userType[]>([]);
  const [donations, setDonations] = useState<donationType[]>([]);
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [comments, setComments] = useState<commentType[]>([]);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState<Partial<commentType>>(
    {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        const projectResponse = await api.get(`projects/${id}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        const commentResponse = await api.get(`comments`);
        const sortedComments = commentResponse.data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        setComments(sortedComments);

        const userId = projectData.userId;
        const userResponse = await api.get(`users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);

        const allUserResponse = await api.get("users");
        const allUserData = allUserResponse.data;
        setAllUser(allUserData);

        const donationsResponse = await api.get("donations");
        const donationsData = donationsResponse.data;
        setDonations(donationsData);

        if (isLoggedIn) {
          const profileResponse = await api.get("users/profile");
          const currentUserData = profileResponse.data;
          setCurrentUser(currentUserData);

          if (projectData.userId === currentUserData.id) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }

          if (currentUser?.isAdmin === true) {
            setModerator(true);
          }
        }
      } catch (error) {
        console.error("Erro ao obter dados do projeto:", error);
      }
    };
    fetchData();
  }, [currentUser?.isAdmin, id, isLoggedIn]);

  const handlePostComment = async () => {
    try {
      if (isLoggedIn && project?.id) {
        if (!comment) {
          setError("Error");
          return;
        } else if (comment.length > 0) {
          const formattedDateTime = new Date().toISOString();

          const commentResponse = await api.post("comments", {
            comment,
            user: currentUser?.user,
            createdAt: formattedDateTime,
            updatedAt: formattedDateTime,
            userId: currentUser?.id,
            projectId: project?.id,
          });

          setComments((prevComments) => [
            commentResponse.data,
            ...prevComments,
          ]);
          setComment("");
        }
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
    return `${date.toLocaleDateString()} às ${hours}:${minutes}`;
  }

  function formatEditTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `Editado em ${date.toLocaleDateString()} às ${hours}:${minutes}`;
  }

  const getUserProfilePic = (userId: number) => {
    const user = allUser.find((u) => u.id === userId);
    return user ? user.profilePic : "/src/assets/images/default_product.png";
  };

  const handleEditProject = () => {
    navigate(`/edit_project/${project?.id}`);
  };

  const total = project?.total ?? 0;
  const goal = project?.goal ?? 1;
  const progress = Math.min((total / goal) * 100, 100);
  const progressBarColor = progress === 100 ? "bg-success" : "bg-info";

  const handleContinue = () => {
    setCurrentSection("message");
  };

  const handleBack = () => {
    setCurrentSection("reason");
  };

  const handleReportProject = async () => {
    try {
      if (project) {
        const updatedReportCount = (project.report ?? 0) + 1;

        await api.put(`projects/${id}`, {
          report: updatedReportCount,
          reportMessages: [...project.reportMessages, ...reportMsg],
        });

        toast.success("Projeto reportado com sucesso!");
        setProject({ ...project, report: updatedReportCount });
        setTimeout(() => {
          navigate(-1);
        }, 4000);
      } else {
        toast.error("Erro ao reportar o projeto. Projeto não encontrado.");
      }
    } catch (error) {
      toast.error("Falha ao reportar o projeto. Tente novamente mais tarde.");
    }
  };

  const isAnyOptionSelected = () => {
    return reportMsg.length > 0;
  };

  const isMessageInputValid = () => {
    return messageInput.trim().length > 0;
  };

  const reportWarning = () => {
    if (project) {
      navigate(`/moderator/${id}`);
    }
  };

  const handleEditComment = async (commentId: number) => {
    try {
      const commentResponse = await api.get(`comments/${commentId}`);
      const commentToEdit = commentResponse.data;

      setEditingComment(commentToEdit);
      setIsEditing(true);
    } catch (error) {
      console.error("Erro ao obter dados do comentário:", error);
    }
  };

  const handleConfirmEditComment = async () => {
    try {
      if (editingComment && editingComment.id) {
        if (!editingComment.comment) {
          setError("Error");
          return;
        } else if (editingComment.comment.length > 0) {
          await api.put(`comments/${editingComment.id}`, {
            comment: editingComment.comment,
          });

          setComments(
            (prevComments) =>
              prevComments.map((com) =>
                com.id === editingComment.id
                  ? { ...com, comment: editingComment.comment }
                  : com
              ) as commentType[]
          );
        }
      }
    } catch (error) {
      console.error("Erro ao confirmar a edição do comentário:", error);
    } finally {
      setEditingComment({});
      setIsEditing(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`comments/${commentId}`);

      setComments((prevComments) =>
        prevComments.filter((com) => com.id !== commentId)
      );
    } catch (error) {
      console.error("Erro ao excluir o comentário:", error);
    }
  };

  const copyLinkToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast.success("Link copiado para a área de transferência!");
        setTimeout(() => {}, 3000);
      })
      .catch((error) => {
        console.error("Erro ao copiar o link:", error);
      });
  };

  function isBase64Image(image?: string) {
    return image && !image.startsWith("http");
  }

  const defaultImage = require("../../assets/images/default_product.png");

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://stimulus-tcc-fe.vercel.app/project/${project?.id}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=https://stimulus-tcc-fe.vercel.app/project/${project?.id}`;
  const whatsappShareUrl = `https://wa.me/?text=https://stimulus-tcc-fe.vercel.app/project/${project?.id}`;

  const filteredDonations = donations.filter(
    (donation) => donation.projectId === project?.id
  );

  const sortedDonations = filteredDonations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayDonations = sortedDonations.slice(0, 5);

  return (
    <>
      <Helmet>
        {/* Metatags do Facebook */}
        <meta
          property="og:url"
          content={`https://stimulus-tcc-fe.vercel.app/project/${project?.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={project?.name} />
        <meta property="og:description" content={"Impulsione este projeto!"} />
        <meta property="og:image" content={project?.image[0]} />

        {/* Metatags do Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project?.name} />
        <meta name="twitter:description" content={"Impulsione este projeto!"} />
        <meta name="twitter:image" content={project?.image[0]} />
      </Helmet>

      <Navbar />

      <div className="page-container">
        {project && (
          <>
            <h1 className="text-center shadow fw-bolder py-2 my-3">
              {project?.name}
            </h1>
            <div className="main-content container shadow border rounded text-center bg-light bg-gradient my-5 mx-auto">
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

                <div className="col p-4 border border-1">
                  <div className="row">
                    <div className="col text-start">
                      <button
                        className="editBtn btn btn-danger text-light"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#report"
                      >
                        {""}
                        <ExclamationTriangleIcon />
                      </button>
                      <div
                        className="modal fade"
                        id="report"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="reportLabel"
                        aria-hidden="true"
                      >
                        <div className="full-modal-pic modal-dialog modal-dialog-scrollable modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="modal-dialog-scrollable"
                              >
                                {currentSection === "reason"
                                  ? "Qual o motivo da sua denúncia?"
                                  : "Descreva o motivo da sua denúncia"}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              {currentSection === "reason" ? (
                                <>
                                  <div className="form-check my-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                      value="Conteúdo inapropriado"
                                      onChange={(e) =>
                                        setReportMsg([e.target.value])
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault1"
                                    >
                                      Conteúdo inapropriado
                                    </label>
                                  </div>
                                  <div className="form-check mb-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      value="Assédio ou bullying"
                                      onChange={(e) =>
                                        setReportMsg([e.target.value])
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault2"
                                    >
                                      Assédio ou bullying
                                    </label>
                                  </div>
                                  <div className="form-check mb-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault3"
                                      value="Conteúdo de incitação ao ódio ou abusivo"
                                      onChange={(e) =>
                                        setReportMsg([e.target.value])
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault3"
                                    >
                                      Conteúdo de incitação ao ódio ou abusivo
                                    </label>
                                  </div>
                                  <div className="form-check mb-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault4"
                                      value="Promove terrorismo"
                                      onChange={(e) =>
                                        setReportMsg([e.target.value])
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault4"
                                    >
                                      Promove terrorismo
                                    </label>
                                  </div>
                                  <div className="form-check my-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault5"
                                      value="Problema jurídico"
                                      onChange={(e) =>
                                        setReportMsg([e.target.value])
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault5"
                                    >
                                      Problema jurídico
                                    </label>
                                  </div>
                                </>
                              ) : (
                                <div className="form-group">
                                  <label htmlFor="reportMessage">
                                    Descreva qual o motivo da sua denúncia:
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="reportMessage"
                                    rows={3}
                                    value={messageInput}
                                    onChange={(e) =>
                                      setMessageInput(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              )}
                            </div>
                            <div className="modal-footer">
                              {currentSection === "message" && (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={handleBack}
                                >
                                  Voltar
                                </button>
                              )}
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Fechar
                              </button>
                              {currentSection === "reason" ? (
                                <button
                                  type="button"
                                  className="btn btn-info text-light"
                                  onClick={handleContinue}
                                  disabled={!isAnyOptionSelected()}
                                >
                                  Continuar
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-info text-light"
                                  data-bs-dismiss="modal"
                                  disabled={!isMessageInputValid()}
                                  onClick={
                                    isLoggedIn
                                      ? handleReportProject
                                      : () => navigate("/signin")
                                  }
                                >
                                  Confirmar
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      {moderator && project.report >= 1 ? (
                        <button
                          className="editBtn btn btn-warning text-light"
                          type="submit"
                          onClick={() => reportWarning()}
                        >
                          {""}
                          <ShieldExclamationIcon />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col text-end">
                      {isLoggedIn && isOwner && (
                        <button
                          className="editBtn btn btn-info text-light"
                          type="submit"
                          onClick={() => handleEditProject()}
                        >
                          {""}
                          <PencilSquareIcon />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="m-5 py-3">
                    <p className="text-start fw-bold">
                      Criador:{" "}
                      <u
                        className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        onClick={() => navigate(`/project_creator/${user?.id}`)}
                      >
                        {user?.user}
                      </u>
                    </p>
                    <p className="text-start fw-semibold">
                      Atingido:{" "}
                      <span className="text-info">{`${progress.toFixed(
                        0
                      )}%`}</span>
                    </p>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Progress bar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`progress-bar ${progressBarColor}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-start fw-semibold">
                      Meta:{" "}
                      <span className="text-secondary">R$ {project?.goal}</span>
                    </p>
                  </div>
                  <div className="mx-5">
                    <h2 className="fw-bolder py-4">
                      Arrecadado:{" "}
                      <span className="text-info">R$ {project.total}</span>
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
                <li className="nav-item p-0" role="presentation">
                  <button
                    className="nav-link border border-dark rounded-start-0 rounded-bottom-0 rounded-top-1 text-light"
                    type="button"
                    id="pills-donation-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-donation"
                    role="tab"
                    aria-controls="pills-donation"
                    aria-selected="false"
                  >
                    Doadores
                    <UserGroupIcon className="navIcons" />
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
                  <h2 className="text-center pb-4 fw-bolder">
                    {project?.name}
                  </h2>
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
                          <div
                            className={`container my-1 border border-secondary rounded p-3 ${
                              isEditing && com.id === editingComment.id
                                ? "editing-comment"
                                : ""
                            }`}
                            key={com.id}
                          >
                            <div className="d-flex align-items-start">
                              <p className="mx-2 fs-5 fw-medium">
                                <img
                                  src={getUserProfilePic(com.userId)}
                                  alt="avatar"
                                  width="30rem"
                                  className="me-2"
                                />
                                {com.user}
                              </p>
                              <p className="text-secondary mt-1">
                                -{" "}
                                {com.updatedAt !== com.createdAt
                                  ? formatEditTimestamp(com.updatedAt)
                                  : formatCommentTimestamp(com.createdAt)}
                              </p>
                              {isLoggedIn && com.userId === currentUser?.id && (
                                <>
                                  <div className="d-grid gap-2 d-md-flex align-items-md-end ms-3">
                                    <button
                                      className="comBtn btn btn-info text-light"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editComment"
                                      onClick={() => handleEditComment(com.id)}
                                    >
                                      {""}
                                      <PencilSquareIcon />
                                    </button>
                                    <button
                                      className="comBtn btn btn-danger text-light"
                                      type="button"
                                      onClick={() =>
                                        handleDeleteComment(com.id)
                                      }
                                    >
                                      {""}
                                      <TrashIcon />
                                    </button>
                                  </div>
                                  <div
                                    className="modal fade"
                                    id="editComment"
                                    data-bs-backdrop="static"
                                    data-bs-keyboard="false"
                                    tabIndex={-1}
                                    aria-labelledby="staticBackdropLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog modal-dialog-centered">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h1
                                            className="modal-title fs-5"
                                            id="staticBackdropLabel"
                                          >
                                            Editar seu comentário
                                          </h1>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <textarea
                                            name="editedComment"
                                            aria-describedby="commentAria"
                                            placeholder="Deixe um comentário"
                                            title="commentModal"
                                            value={
                                              editingComment?.comment || ""
                                            }
                                            onChange={(e) => [
                                              setEditingComment({
                                                ...editingComment,
                                                comment: e.target.value,
                                              }),
                                              setError(""),
                                            ]}
                                            className={
                                              error && !editingComment.comment
                                                ? "form-control is-invalid"
                                                : "form-control"
                                            }
                                          ></textarea>
                                          <div
                                            id="commentAria"
                                            className="invalid-feedback text-center fw-medium"
                                          >
                                            O campo não pode ser vazio!
                                          </div>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={() =>
                                              setEditingComment({})
                                            }
                                          >
                                            Fechar
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-info text-light"
                                            data-bs-dismiss={
                                              error && !editingComment.comment
                                                ? ""
                                                : "modal"
                                            }
                                            onClick={handleConfirmEditComment}
                                          >
                                            Confirmar
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="commentColor rounded-pill bg-light bg-gradient border border-2 border-info p-1 pt-3 ps-3 w-auto justify-content-center">
                              <p className="text-start ms-2 fw-medium fs-4">
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
                        name="comment"
                        id="floatingTextarea"
                        aria-describedby="comment1Aria"
                        placeholder="Deixe um comentário"
                        title="comment"
                        value={comment}
                        onChange={(e) => [setComment(e.target.value)]}
                        className={
                          error && !comment
                            ? "form-control border-2 is-invalid"
                            : "form-control border border-dark border-2"
                        }
                      ></textarea>
                      <div
                        id="comment1Aria"
                        className="invalid-feedback text-center fw-medium"
                      >
                        O campo não pode ser vazio!
                      </div>
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
                  <h2 className="text-center pb-4 mb-5 fw-bolder">
                    Compartilhe este projeto
                  </h2>
                  <div className="row mb-4 text-center fs-5 fw-medium">
                    <div className="col mt-2">
                      <span className="fs-4 mx-3 fw-semibold">
                        Copie este link:
                      </span>
                      <button
                        type="button"
                        className="shareButton"
                        onClick={copyLinkToClipboard}
                      >
                        <ShareIcon className="shareIcon" />
                        {""}
                      </button>
                    </div>
                    <div className="col mt-2">
                      <span className="fs-4 mx-3 fw-semibold">Facebook:</span>
                      <a
                        type="button"
                        href={facebookShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={require("../../assets/images/facebook_logo.png")}
                          alt="facebook"
                          width="40"
                        />
                      </a>
                    </div>
                    <div className="col mt-2">
                      <span className="fs-4 mx-3 fw-semibold">Twitter:</span>
                      <a
                        type="button"
                        href={twitterShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={require("../../assets/images/twitter_logo.png")}
                          alt="twitter"
                          width="40"
                        />
                      </a>
                    </div>
                    <div className="col mt-1">
                      <span className="fs-4 mx-3 fw-semibold">WhatsApp:</span>
                      <a
                        type="button"
                        href={whatsappShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={require("../../assets/images/whatsapp_logo.png")}
                          alt="whatsapp"
                          width="50"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-donation"
                  role="tabpanel"
                  aria-labelledby="pills-donation-tab"
                >
                  <h2 className="text-center pb-4 mb-5 fw-bolder">
                    Doadores que apoiaram este projeto
                  </h2>
                  <div className="container">
                    {filteredDonations.length > 0 ? (
                      <>
                        {displayDonations.map((donation) => {
                          const user = allUser.find(
                            (u) => u.id === donation.userId
                          );
                          return user ? (
                            <div
                              key={donation.id}
                              className="row donation-info"
                            >
                              <div className="col-lg-2 col-sm-4 text-center">
                                <img
                                  src={user.profilePic}
                                  alt="Foto do usuário"
                                  width="80rem"
                                />
                              </div>
                              <div className="col-lg-2 col-sm-4">
                                <p className="fs-4 fw-semibold">{user.user}</p>
                                <p className="fs-5 fw-semibold">
                                  Valor: {donation.value}
                                </p>
                              </div>
                              <div className="col-lg-8 col-sm-2 text-end">
                                <p className="fs-6 fw-semibold">
                                  {new Date(
                                    donation.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <hr />
                            </div>
                          ) : null;
                        })}
                        {filteredDonations.length > 5 && (
                          <div className="text-center mt-4">
                            <button
                              type="button"
                              onClick={() => navigate(`/donors/${id}`)}
                              className="btn btn-info text-light fw-semibold fs-5 rounded-pill"
                            >
                              Ver todos os doadores{" "}
                              <ArrowRightCircleIcon className="dollarIcon" />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center fs-4 fw-semibold">
                        Não há doadores para este projeto.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <ToastContainer autoClose={3000} className="custom-toast" />

        <Footer />
      </div>
    </>
  );
};

export default Project;
