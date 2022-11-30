import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
});

api.defaults.headers.common["Authorization"] =
  "Bearer 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";
