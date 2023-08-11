import {
  Bars3BottomLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

import "./styles.css";

const Project: React.FC = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <img
              src={require("../../assets/images/logo_1.png")}
              alt="Logo do site"
              className="logo mx-auto d-block"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex mx-auto" role="search">
              <div className="searchIcon">
                <input
                  className="pesquisa form-control text-light me-2"
                  type="search"
                  placeholder="     Pesquisar"
                  aria-label="Search"
                />
                <MagnifyingGlassIcon />
              </div>
              <button className="btn btn-outline-info fw-medium" type="submit">
                Pesquisar
              </button>
            </form>
            <ul className="navbar-nav mt-1">
              <li className="nav-item border rounded me-1">
                <a className="nav-link fw-medium" href="/categories">
                  Categorias
                </a>
              </li>
              <li className="nav-item border rounded me-1">
                <a className="profile nav-link fw-medium" href="/">
                  Login
                  <UserCircleIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Nome do Projeto
      </h1>
      <div className="container shadow border rounded text-center bg-light bg-gradient my-5 mx-auto">
        <div className="row row-cols-lg-2 row-cols-1 border secondary">
          <div className="col">
            <div
              id="carouselExampleIndicators"
              className="carousel carousel-dark slide"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={require("../../assets/images/categorie_art.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../assets/images/categorie_book.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../assets/images/categorie_game.png")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
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
            <u className="text-start fw-medium">Criador: Nome do criador</u>
            <div className="m-5 py-3">
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
                <div className="progress-bar bg-info progress-bar-striped w-50"></div>
              </div>
              <p className="text-start fw-medium">
                Meta: <span className="text-secondary">R$ 400</span>
              </p>
            </div>
            <div className="mx-5">
              <h2 className="fw-bolder py-4">
                Arrecadado: <span className="text-info">R$ 200</span>
              </h2>
            </div>
            <button
              className="btn btn-info text-light rounded-pill mt-5 pb-2 pt-2 fs-3 fw-semibold shadow-sm"
              type="submit"
            >
              Financiar projeto
              <CurrencyDollarIcon className="dollarIcon" />
            </button>
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
              data-bs-target="#pill-about"
              role="tab"
              aria-controls="pills-about"
              aria-selected="true"
            >
              Sobre o projetos
              <Bars3BottomLeftIcon className="navIcons" />
            </button>
          </li>
          <li className="nav-item p-0" role="presentation">
            <button
              className="nav-link border border-dark rounded-0 text-light"
              type="button"
              id="pills-comment-tab"
              data-bs-toggle="pill"
              data-bs-target="#pill-comment"
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
              data-bs-target="#pill-share"
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
            className="tab-pane fade show"
            id="pills-about"
            role="tabpanel"
            aria-labelledby="pills-about-tab"
          >
            <h2 className="text-center pb-4 fw-bolder">Nome do projeto</h2>
            <p className="text-center fw-medium px-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloremque eveniet pariatur ratione. Dolorem obcaecati neque ipsa
              fuga veniam delectus earum ullam, esse magnam nihil assumenda
              mollitia cum placeat, unde necessitatibus impedit est repellendus
              hic odio laboriosam, consequatur alias! Esse quidem officiis
              nesciunt saepe voluptatibus voluptates amet molestiae, nisi,
              soluta pariatur, sit delectus expedita cupiditate mollitia quo
              inventore consequuntur deserunt excepturi possimus quaerat
              deleniti autem illum ullam sapiente! Nemo blanditiis iure corporis
              adipisci! Minus commodi ipsa consequatur voluptas tempore rerum
              nam reprehenderit odit dolorum aperiam sint amet consectetur iure
              esse quasi, excepturi dolores architecto omnis dolor soluta.
              Veniam error quaerat voluptatum voluptatibus obcaecati excepturi
              repudiandae tempora quidem, eum voluptas voluptate fugit, debitis
              delectus quo nobis saepe. Quidem, doloribus consequuntur vel
              consequatur id magnam accusantium ad ipsa, natus delectus
              distinctio dolor nemo. Sed nam corrupti, totam ipsa aliquid vero
              natus. Sit perferendis veritatis voluptates quibusdam ea labore
              excepturi, dolor, eius ad odit inventore libero! Ratione tenetur
              rem iste nihil. Aspernatur eaque dolorum reprehenderit temporibus
              itaque est animi iure et, deleniti possimus fuga quaerat vitae
              atque a in ducimus iusto harum debitis perferendis laborum
              officiis cumque dicta qui. Sapiente quae totam illo dolor tempora
              aliquam, dolore fugit quis ratione, quaerat nesciunt esse
              corrupti?
            </p>
          </div>
          <div
            className="tab-pane fade show"
            id="pills-comment"
            role="tabpanel"
            aria-labelledby="pills-comment-tab"
          >
            <h2 className="text-center pb-4 fw-bolder">Deixe seu comentário</h2>
            <div className="container p-3">
              <p className="text-start ms-2">Nome da pessoa</p>
              <div className="commentColor rounded-pill p-1 pt-3 ps-3 w-auto justify-content-center">
                <p className="text-start fw-medium fs-4">
                  Comentário da pessoa.
                </p>
              </div>
            </div>
            <div className="form-floating">
              <textarea
                className="form-control border border-dark border-2"
                name="comment"
                id="floatingTextarea"
                title="comment"
                placeholder="Deixe um comentário"
              ></textarea>
              <label className="text-secondary" htmlFor="floatingTextarea">
                Deixe um comentário
              </label>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-info text-light rounded-pill shadow-sm fw-medium fs-4 mt-3 px-5"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="pills-share"
            role="tabpanel"
            aria-labelledby="pills-share-tab"
          >
            <h2 className="text-center pb-4 fw-bolder">
              Compartilhe este projeto
            </h2>
            <div className="col mx-auto my-auto fs-5 fw-medium">
              <div className="col pb-2">
                <ShareIcon className="shareIcon" /> Copie este link:
                link/nomedoprojeto
              </div>
              <div className="col pb-2">
                <a className="text-decoration-none text-dark" href="/home">
                  <img
                    src={require("../../assets/images/facebook_logo.png")}
                    alt="facebook"
                    width="30"
                    className="me-4"
                  />
                  Facebook: facebook.com/nomedoprojeto
                </a>
              </div>
              <div className="col pb-2">
                <a className="text-decoration-none text-dark" href="/home">
                  <img
                    src={require("../../assets/images/twitter_logo.png")}
                    alt="twitter"
                    width="30"
                    className="me-4"
                  />
                  Twitter: twitter.com/nomedoprojeto
                </a>
              </div>
              <div className="col pb-2">
                <a className="text-decoration-none text-dark" href="/home">
                  <img
                    src={require("../../assets/images/linkedin_logo.png")}
                    alt="linkedin"
                    width="30"
                    className="me-4"
                  />
                  Linkedin: linkedin.com/nomedoprojeto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="container-fluid mt-3 p-3 text-center">
        <div className="row">
          <div className="col">
            <img
              src={require("../../assets/images/logo_1.png")}
              alt="Logo do site"
              width="300"
              className="mt-2"
            />
          </div>
          <div className="col">
            <p className="fw-medium fs-4 mt-1 text-light">Contate-nos</p>
            <a href="/home">
              <img
                src={require("../../assets/images/facebook_logo.png")}
                alt="facebook"
                width="30"
                className="me-1"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/twitter_logo.png")}
                alt="twitter"
                width="31"
                className="me-1"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/gmail_logo.png")}
                alt="gmail"
                width="30"
                className="me-2"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/linkedin_logo.png")}
                alt="linkedin"
                width="30"
                className="me-1"
              />
            </a>
            <a href="/home">
              <img
                src={require("../../assets/images/whatsapp_logo.png")}
                alt="whatsapp"
                width="30"
                className="me-2"
              />
            </a>
          </div>
          <div className="col">
            <p className="fw-medium text-light mt-4">
              Copyright © 2023 <br /> Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Project;
