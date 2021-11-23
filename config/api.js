import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: "http://192.168.100:/tasks/",
});

export const API_URL = "https://619a464c9022ea0017a7b0c7.mockapi.io/tasks/";
