import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./styles.css";

const Categories: React.FC = () => {
  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Categorias</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5 mx-auto my-auto">
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_art.png")}
                className="card-img"
                alt="Arte"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Arte</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_gastronomy.png")}
                className="card-img"
                alt="Gastronomia"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Gastronomia</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_game.png")}
                className="card-img"
                alt="Jogo"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Jogo</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_book.png")}
                className="card-img"
                alt="Livro"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Livro</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_music.png")}
                className="card-img"
                alt="Música"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Música</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="catcard card pt-4 h-100">
            <a href="/categories" className="text-dark">
              <img
                src={require("../../assets/images/categorie_technology.png")}
                className="card-img"
                alt="Tecnologia"
              />
              <div className="card-img-overlay">
                <h3 className="text-center fw-bolder">Tecnologia</h3>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Categories;
