import React, { FormEvent, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./styles.css";

const Reward: React.FC = () => {
  const [input, setInput] = useState(10);
  const [error, setError] = useState("");

  const handleReward = async (e: FormEvent) => {
    e.preventDefault();

    if (input <= 0) {
      setError("O valor precisa ser maior que 0!");
      return;
    } else if (!input) {
      setError("Um valor é requerido!");
      return;
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">Recompensas</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <form action="#" onSubmit={handleReward} className="mb-3">
          <label htmlFor="basic-url" className="form-label">
            Doe com um valor personalizado
          </label>
          <div className="input-group">
            <span className="input-group-text">R$</span>
            <input
              type="number"
              aria-label="Amount"
              value={input}
              onChange={(e) => {
                setInput(parseInt(e.target.value, 10));
                setError("");
              }}
              className={
                (error && !input) || input <= 0
                  ? "form-control is invalid"
                  : "form-control"
              }
            />
            <button type="submit" className="btn btn-info text-light">
              Confirmar
            </button>
          </div>
          <label className="d-flex flex-column text-danger fw-medium mb-3">
            {error}
          </label>
        </form>
      </div>

      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h4 className="fw-medium pb-3">
          Valor <span className="text-info">R$ 10</span>
        </h4>
        <h5 className="fw-bolder py-2">Nome da recompensa</h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
          repellat ab dolorem minus numquam magni atque asperiores eligendi
          adipisci! At nam quia ipsum odio corporis suscipit placeat quasi hic,
          ipsam cumque debitis, beatae consequatur eos magni, quaerat quod nulla
          quibusdam quas consequuntur quis facilis laudantium. Totam aliquid
          incidunt eius vero tempora quis nemo dicta quia doloremque, eligendi
          repudiandae debitis accusamus quae saepe, veritatis atque itaque
          praesentium, earum molestias perferendis veniam dolorem quidem. Ipsa,
          quae iusto fuga accusamus consequatur numquam aut sunt recusandae
          accusantium atque illo omnis similique labore asperiores quod
          laboriosam sit nesciunt a ab quaerat iure tempore.
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button
            type="submit"
            className="btn btn-info text-light fw-medium rounded-pill shadow px-4 py-2"
          >
            Doar R$ 10
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Reward;
