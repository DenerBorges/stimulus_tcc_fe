import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import payment from "../../utils/payment";
import InputMask from "react-input-mask";
import {
  getCities,
  getStates,
  isValidCPF,
} from "@brazilian-utils/brazilian-utils";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";
import { userType } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";

import "./styles.css";
import { rewardType } from "../../types/reward";

const Payment: React.FC = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<userType>();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [document, setDocument] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState<StateCode>();
  const [reward, setReward] = useState<rewardType>();
  const [value, setValue] = useState();
  const [projectId, setProjectId] = useState("");
  const [responsePayment, setResponsePayment] = useState<any>(false);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState<any>(false);
  const [statusPayment, setStatusPayment] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getReward = async () => {
    try {
      const response = await api.get(`rewards/${id}`);
      setReward(response.data);
      setValue(response.data.value);
      setProjectId(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      setUser(response.data.user);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setDocument(response.data.document);
      setZipCode(response.data.zipCode);
      setStreet(response.data.street);
      setNumber(response.data.number);
      setComplement(response.data.complement);
      setNeighborhood(response.data.neighborhood);
      setCity(response.data.city);
      setState(response.data.state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getReward();
  }, []);

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (
        !user ||
        !email ||
        !mobile ||
        !document ||
        !zipCode ||
        !street ||
        !number ||
        !neighborhood ||
        !city ||
        !state
      ) {
        setError("Error");
        return;
      } else if (!emailRegex.test(email)) {
        setError("Error");
        return;
      } else if (!validarNumeroCelular(mobile)) {
        setError("Error");
        return;
      } else if (!isValidCPF(document)) {
        setError("Error");
        return;
      } else {
        const body = {
          payment_method_id: "pix",
          transaction_amount: Number(reward?.value),
          payer: {
            email: email,
            first_name: user,
            identification: {
              type: "CPF",
              number: document,
            },
            address: {
              zip_code: zipCode,
              street_name: street,
              street_number: number,
            },
          },
          notification_url: process.env.NOTIFICATION_URL,
        };

        await api.put(`users/${profile?.id}`, {
          user,
          email,
          mobile,
          document,
          zipCode,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await payment.post(
          `payments?access_token=${process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC}`,
          body
        );

        setResponsePayment(response);
        setLinkBuyMercadoPago(
          response.data.point_of_interaction.transaction_data.ticket_url
        );
      }
    } catch (error) {
      console.error("Erro ao efetuar pagamento: ", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="text-center shadow fw-bolder py-2 my-3">Pagamento</h1>
        <div className="main-content container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
          {!responsePayment && (
            <>
              <h4 className="fw-bolder mb-4">Informações pessoais</h4>
              <form method="post" onSubmit={handlePayment}>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label fw-medium">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    id="user"
                    aria-describedby="userFeedback"
                    value={user}
                    onChange={(e) => [setUser(e.target.value), setError("")]}
                    className={
                      error && !user
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <div id="userFeedback" className="invalid-feedback fw-medium">
                    Preencha o campo de usuário!
                  </div>
                </div>
                <div className="row align-items-start mb-4">
                  <div className="col">
                    <label htmlFor="email" className="form-label fw-medium">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="E-mail completo"
                      id="email"
                      aria-describedby="emailAria"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        (error && !email) ||
                        (!emailRegex.test(email) && email.length !== 0)
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <div id="emailAria" className="invalid-feedback fw-medium">
                      Email não é valido!
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="mobile" className="form-label fw-medium">
                      Celular
                    </label>
                    <InputMask
                      type="text"
                      mask="99999-9999"
                      maskChar={null}
                      aria-describedby="mobileAria"
                      placeholder="Número de celular"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className={
                        (error && !mobile) ||
                        (error && !validarNumeroCelular(mobile))
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <div id="mobileAria" className="invalid-feedback fw-medium">
                      Telefone inválido!
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="document" className="form-label fw-medium">
                      CPF
                    </label>
                    <InputMask
                      type="text"
                      mask="999.999.999-99"
                      maskChar={null}
                      aria-describedby="documentAria"
                      placeholder="CPF"
                      id="document"
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                      className={
                        (error && !document) || (error && !isValidCPF(document))
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <div
                      id="documentAria"
                      className="invalid-feedback fw-medium"
                    >
                      CPF inválido!
                    </div>
                  </div>
                </div>
                <h4 className="fw-bolder mb-4">Informações de entrega</h4>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label fw-medium">
                    CEP
                  </label>
                  <InputMask
                    type="text"
                    mask="99999-999"
                    maskChar={null}
                    aria-describedby="zipAria"
                    placeholder="CEP"
                    id="zip"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={
                      error && !zipCode
                        ? "form-control is-invalid w-25"
                        : "form-control w-25"
                    }
                  />
                  <div id="zipAria" className="invalid-feedback fw-medium">
                    CEP não pode ser vazio!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label fw-medium">
                    Endereço
                  </label>
                  <input
                    type="text"
                    aria-describedby="streetAria"
                    placeholder="Endereço completo"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className={
                      error && !street
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <div id="streetAria" className="invalid-feedback fw-medium">
                    Endereço não pode ser vazio!
                  </div>
                </div>
                <div className="row align-items-start mb-3">
                  <div className="col">
                    <label htmlFor="number" className="form-label fw-medium">
                      Número
                    </label>
                    <input
                      type="number"
                      aria-describedby="numberAria"
                      placeholder="Número da residência"
                      id="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className={
                        error && !number
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <div id="numberAria" className="invalid-feedback fw-medium">
                      Número não pode ser vazio!
                    </div>
                  </div>
                  <div className="col">
                    <label
                      htmlFor="complement"
                      className="form-label fw-medium"
                    >
                      Complemento(Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Complemento"
                      id="complement"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row align-items-start mb-4">
                  <div className="col">
                    <label
                      htmlFor="neighborhood"
                      className="form-label fw-medium"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      aria-describedby="neighborhoodAria"
                      placeholder="Bairro"
                      id="neighborhood"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className={
                        error && !neighborhood
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <div
                      id="neighborhoodAria"
                      className="invalid-feedback fw-medium"
                    >
                      Bairro não pode ser vazio!
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="state" className="form-label fw-medium">
                      Estado
                    </label>
                    <select
                      className="form-select"
                      id="state"
                      aria-label="Select State"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value as StateCode)}
                    >
                      <option value="" disabled>
                        Selecione o estado
                      </option>
                      {getStates().map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="city" className="form-label fw-medium">
                      Cidade
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      aria-label="Select City"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="" disabled>
                        Selecione a cidade
                      </option>
                      {state
                        ? getCities(state).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                  <button
                    type="submit"
                    className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-5 py-2"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </>
          )}

          {linkBuyMercadoPago && !statusPayment && (
            <iframe
              src={linkBuyMercadoPago}
              className="container"
              width="400px"
              height="620px"
              title="link_buy"
            />
          )}

          {statusPayment && <h1>Compra Aprovada</h1>}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
