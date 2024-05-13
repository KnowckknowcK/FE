/** @format */
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const customAxios = axios.create({
  baseURL: REACT_APP_API_URL + "/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default customAxios;
