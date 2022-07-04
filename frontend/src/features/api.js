import axios from "axios";

// Development
//export const url = "http://localhost:8000/api/v1";
// Production
export const url = "https://chagest-eshop.herokuapp.com/api/v1/";

const token = localStorage.getItem("token");

export const publicAxios = axios.create({
  baseURL: url,
});

export const authAxios = axios.create({
  baseURL: url,
  headers: {
    'x-access-token': token,
  }
});
