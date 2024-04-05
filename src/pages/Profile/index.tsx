import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "../../types/user";
import { projectType } from "../../types/project";
import { donationType } from "../../types/donation";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<userType>();
  const [user, setUser] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [dateType, setDateType] = useState("text");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [tempProfilePic, setTempProfilePic] = useState<string | null>(null);
  const [projects, setProjects] = useState<projectType[]>([]);
  const [donations, setDonations] = useState<donationType[]>([]);
  const [selectedDonations, setSelectedDonations] = useState<donationType[]>(
    []
  );
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const selectImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleUpdatePic = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedImageUrl) {
      window.confirm("Selecione uma imagem antes de confirmar.");
      return;
    }

    // Atualize o estado temporário
    setTempProfilePic(selectedImageUrl);
  };

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  var data = birthdate;
  var data_array = data.split("-");

  if (data_array[0].length !== 4 && data_array[0].length <= 4) {
    data = data_array[2] + "-" + data_array[1] + "-" + data_array[0];
  }

  var hoje = new Date();
  var nasc = new Date(data);
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

  function validarNumeroCelular(numeroCelular: string): boolean {
    if (numeroCelular.trim() === "") {
      return true;
    }

    const padrao = /^(\(\d{2}\)\s?)?\d{5}-\d{4}$/;

    if (padrao.test(numeroCelular)) {
      return true;
    } else {
      return false;
    }
  }

  const fetchUserDonations = async () => {
    try {
      const response = await api.get("donations");
      setDonations(response.data);
    } catch (error) {
      console.error("Erro ao obter doações do usuário:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Erro ao obter projetos:", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      setUser(response.data.user);
      setBirthdate(response.data.birthdate);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setProfilePic(response.data.profilePic);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    fetchUserDonations();
    fetchProjects();
  }, []);

  const handleOpenModal = () => {
    const userDonations = donations.filter(
      (donation) => donation.userId === profile?.id
    );
    setSelectedDonations(userDonations); // Armazenar as doações do usuário logado no estado
  };

  const getProjectName = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : "Projeto não encontrado";
  };

  const formatCurrency = (value: number) => {
    return (value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para formatar a data no formato legível
  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!user || !birthdate || !email) {
        setError("Error");
        return;
      } else if (idade < 18 || idade > 100) {
        setError("Error");
        return;
      } else if (!emailRegex.test(email)) {
        setError("Error");
        return;
      } else if (!validarNumeroCelular(mobile)) {
        setError("Error");
        return;
      } else {
        const updateData: any = {
          user,
          birthdate,
          email,
          mobile,
        };

        if (tempProfilePic) {
          updateData.profilePic = tempProfilePic;
        }

        await api.put(`users/${profile?.id}`, updateData);

        getProfile();

        toast.success("Perfil atualizado com sucesso!\nRedirecionando...", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
          className: "custom-toast",
        });

        setTimeout(() => {
          navigate("/signin");
        }, 4000);
      }
    } catch (error) {
      toast.error(
        "Um erro ocorreu ao atualizar o perfil.\nPor favor tente novamente."
      );
    }
  };

  const handleDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`users/${profile?.id}`);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/signin");
      } catch (error) {
        console.error("Erro ao excluir a conta: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Perfil</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do usuário</h2>
        <form className="row" method="post" key={profile?.id}>
          <div className="container col offset-10 text-center">
            <button
              type="button"
              className="btn btn-info text-light"
              data-bs-toggle="modal"
              data-bs-target="#paymentRecord"
              onClick={handleOpenModal}
            >
              {""}
              <ClipboardDocumentListIcon style={{ width: "24px" }} />
            </button>
          </div>
          <div
            className="modal fade"
            id="paymentRecord"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="profilePicLabel"
            aria-hidden="true"
          >
            <div className="full-modal-pic modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="modal-dialog-scrollable">
                    Registro de doações
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedDonations.length > 0 ? (
                    selectedDonations.map((donation) => (
                      <div key={donation.id}>
                        <p>Nome: {getProjectName(donation.projectId)}</p>
                        <p>Valor: {formatCurrency(donation.value)}</p>
                        <p>Status: {donation.name}</p>
                        <p>Data da doação: {formatDate(donation.createdAt)}</p>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma doação encontrada para este usuário.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-info text-light"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container col-md-6 offset-md-3 text-center mb-4">
            <img
              src={tempProfilePic || profile?.profilePic}
              alt="Foto de Perfil"
              className="profile-image"
              data-bs-toggle="modal"
              data-bs-target="#profilePic"
            />
          </div>
          <div
            className="modal fade"
            id="profilePic"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="profilePicLabel"
            aria-hidden="true"
          >
            <div className="full-modal-pic modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Escolha seu avatar
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container text-center">
                    <div className="f-row row align-items-start">
                      <img
                        src="https://i.imgur.com/JaCbdwu.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/JaCbdwu.png")
                        }
                        alt="avatar1"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/JaCbdwu.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/0EeZEGh.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/0EeZEGh.png")
                        }
                        alt="avatar2"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/0EeZEGh.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/OkZfyRi.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/OkZfyRi.png")
                        }
                        alt="avatar3"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/OkZfyRi.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/6wUE9VU.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/6wUE9VU.png")
                        }
                        alt="avatar4"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/6wUE9VU.png" ? 'selected' : ''}`}
                      ></img>
                    </div>
                    <div className="s-row row align-items-start">
                      <img
                        src="https://i.imgur.com/vFzf8nS.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/vFzf8nS.png")
                        }
                        alt="avatar5"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/vFzf8nS.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/CKh51X2.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/CKh51X2.png")
                        }
                        alt="avatar6"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/CKh51X2.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/ZaMXigS.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/ZaMXigS.png")
                        }
                        alt="avatar7"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/ZaMXigS.png" ? 'selected' : ''}`}
                      ></img>
                      <img
                        src="https://i.imgur.com/nHvhGwg.png"
                        onClick={() =>
                          selectImage("https://i.imgur.com/nHvhGwg.png")
                        }
                        alt="avatar8"
                        className={`modal-pic col h-100 ${selectedImageUrl === "https://i.imgur.com/nHvhGwg.png" ? 'selected' : ''}`}
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    onClick={handleUpdatePic}
                    className="btn btn-info text-light"
                    data-bs-dismiss="modal"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="user"
              className="offset-sm-1 w-25 px-0 pt-2 fw-bold"
            >
              Nome:
            </label>
            <input
              id="user"
              type="text"
              aria-describedby="userAria"
              placeholder="Insira seu nome completo"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className={
                error && !user
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="userAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de usuário!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="date"
              className="offset-sm-1 w-25 px-0 pt-2 fw-bold"
            >
              Data de nascimento:
            </label>
            <input
              type={dateType}
              id="date"
              aria-describedby="dateAria"
              placeholder="Insira sua data de nascimento"
              value={birthdate}
              onFocus={() => setDateType("date")}
              onChange={(e) => [setBirthdate(e.target.value), setError("")]}
              className={
                (error && !birthdate) || idade < 18 || idade > 100
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="dateAria"
              className="invalid-feedback text-center fw-medium"
            >
              Você precisa ter 18 anos ou mais!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="email"
              className="offset-sm-1 w-25 px-0 pt-2 fw-bold"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              aria-describedby="emailAria"
              placeholder="Insire seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                (error && !email) ||
                (!emailRegex.test(email) && email.length !== 0)
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="emailAria"
              className="invalid-feedback text-center fw-medium"
            >
              Email não é valido!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="mobile"
              className="offset-sm-1 w-25 px-0 pt-2 fw-bold"
            >
              Celular:
            </label>
            <InputMask
              id="mobile"
              type="text"
              mask="99999-9999"
              maskChar={null}
              aria-describedby="mobileAria"
              placeholder="Insire o número do celular"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={
                error && !validarNumeroCelular(mobile)
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="mobileAria"
              className="invalid-feedback text-center fw-medium"
            >
              Telefone inválido!
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <button
              type="submit"
              onClick={handleUpdateProfile}
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Atualizar perfil
            </button>
            <button
              type="submit"
              onClick={handleDeleteAccount}
              className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Excluir perfil
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />

      <Footer />
    </>
  );
};

export default Profile;
