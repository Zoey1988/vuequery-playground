import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
});

// TODO-1 Change access token please :)

// To get your access token, follow this instruction
// https://docs.github.com/en/enterprise-cloud@latest/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic

// NOTE: for scope of your access token, you only need «repo» for this project

// If you are fartoot and lazy like Iman or you couldn't get access token for any reason, use mine with cautious

const ACCESS_TOKEN = "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";

api.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
