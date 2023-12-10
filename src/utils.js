import axios from "axios";

// utils.js
const SERVER_ORIGIN = "http://127.0.0.1:8000"; // Replace with your actual server URL and port

const newDevelopmentUrl = `${SERVER_ORIGIN}/mapdata`;
const registerUrl = `${SERVER_ORIGIN}/register`;
const loginUrl = `${SERVER_ORIGIN}/login`;

export const getNewDevelopment = () => {
  return axios
    .get(newDevelopmentUrl, {
      withCredentials: true, // Include credentials
    })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get new development data");
      }
      return response.data;
    });
};

export const registerUser = (values) => {
  return axios
    .post(registerUrl, values)
    .then((res) => res)
    .catch((err) => err);
};

export const loginUser = (values) => {
  return axios
    .post(loginUrl, values)
    .then((res) => {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      return res;
    })
    .catch((err) => err);
};
