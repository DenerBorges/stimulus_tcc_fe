import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { projectType } from "../../types/project";
import { userType } from "../../types/user";
import { donationType } from "../../types/donation";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const Donors: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<projectType>();
  const [users, setUser] = useState<userType[]>([]);
  const [donations, setDonations] = useState<donationType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await api.get(`projects/${id}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        const userResponse = await api.get(`users`);
        const userData = userResponse.data;
        setUser(userData);

        const donationsResponse = await api.get(`donations`);
        const donationsData = donationsResponse.data;
        setDonations(donationsData);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData();
  }, [id]);

  const filteredDonations = donations.filter(
    (donation) => String(donation.projectId) === String(project?.id)
  );

  const sortedDonations = filteredDonations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">
          Doadores do Projeto {project?.name}
        </h1>
        <div className="main-content container shadow border rounded bg-light bg-gradient my-5 mx-auto">
          {sortedDonations.length > 0 ? (
            sortedDonations.map((donation) => {
              const user = users.find((u) => u.id === donation.userId);
              return user ? (
                <div key={donation.id} className="row donation-info mt-4">
                  <div className="col-lg-2 col-sm-4 text-center">
                    <img
                      src={user.profilePic}
                      alt="Foto do usuário"
                      width="80rem"
                    />
                  </div>
                  <div className="col-lg-2 col-sm-4">
                    <p className="fs-4 fw-semibold">{user.user}</p>
                    <p className="fs-5 fw-semibold">Valor: {donation.value}</p>
                  </div>
                  <div className="col-lg-8 col-sm-6 text-end">
                    <p className="fs-6 fw-semibold">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <hr />
                </div>
              ) : null;
            })
          ) : (
            <p className="text-center fs-4 fw-semibold">
              Não há doadores para este projeto.
            </p>
          )}
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-info text-light fw-semibold fs-5 rounded-pill mb-4"
            >
              <ArrowLeftCircleIcon className="dollarIcon" />
              Voltar para a página do projeto{" "}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donors;
