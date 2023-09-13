import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const api = axios.create({
  baseURL: process.env.ASAAS_API_URL,
  headers: {
    access_token: process.env.ASAAS_API_ACCESS_TOKEN,
  },
});
