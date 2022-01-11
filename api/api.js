import { API_BASE } from "./urls";
import axios from "axios";

export const API = axios.create({
  baseURL: API_BASE,
});
