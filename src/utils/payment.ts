import axios from "axios";

const payment = axios.create({
  baseURL: "https://api.mercadopago.com/v1/",
});

payment.interceptors.request.use(async (config) => {
  const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default payment;
