import React, { useEffect, useState } from "react";
import { projectType } from "../../types/project";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import api from "../../utils/api";

import "./styles.css";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<projectType[]>([]);

  const getProjects = async () => {
    try {
      const response = await api.get("projects");
      setProjects([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Projetos em destaque
      </h1>
      <div className="container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
        {projects.length === 0
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          : projects.sort((a, b) => a.id - b.id).map((project) => (
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
        {/* <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do projeto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">This is a short card.</p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info" style={{width: "50%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>50 %</small>
                </div>
                <div className="col p-0">
                  <small>56 dias restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do projeto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={85}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info" style={{width: "85%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>85 %</small>
                </div>
                <div className="col p-0">
                  <small>15 dias restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do projeto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-success" style={{width: "100%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>100 %</small>
                </div>
                <div className="col p-0">
                  <small>13 horas restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do projeto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={15}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info" style={{width: "15%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>15 %</small>
                </div>
                <div className="col p-0">
                  <small>128 dias restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do projeto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={93}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info" style={{width: "93%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>93 %</small>
                </div>
                <div className="col p-0">
                  <small>14 dias restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm h-100">
            <a href="/project">
              <img
                src={require("../../assets/images/default_product.png")}
                className="card-img-top border secondary"
                alt="imagem do produto"
              />
            </a>
            <div className="card-body border secondary">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">
                <small className="text-body-secondary">Categoria</small>
              </p>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={63}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar bg-info" style={{width: "63%"}}></div>
              </div>
              <div className="row pt-2">
                <div className="col pe-0">
                  <small>63 %</small>
                </div>
                <div className="col p-0">
                  <small>98 dias restantes</small>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
};

export default Home;
