import axios from "axios";

// utils.js
const SERVER_ORIGIN = "http://127.0.0.1:8000"; // Replace with your actual server URL and port

// user authentication
const registerUrl = `${SERVER_ORIGIN}/register/`;
const loginUrl = `${SERVER_ORIGIN}/login/`;
const refreshTokenUrl = `${SERVER_ORIGIN}/login/refresh/`;
const logoutUrl = `${SERVER_ORIGIN}/logout/`;
// const confirmEmailUrl = `${SERVER_ORIGIN}/confirm_email/`;

export const registerUser = (values) => {
  return axios
    .post(registerUrl, values)
    .then((res) => res)
    .catch((err) => err);
};

export const loginUser = (values) => {
  return axios.post(loginUrl, values).then((res) => {
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    return res;
  });
};

export const logoutUser = async () => {
  // Remove the tokens from local storage (or wherever you're storing them)
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Make a POST request to the /logout/ endpoint
  try {
    const response = await axios.post(logoutUrl);

    // Handle the response (if necessary)
    console.log(response.data.message);
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
};

export const refreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return axios
    .post(refreshTokenUrl, { refresh: refreshToken })
    .then((res) => {
      // If the refresh was successful, store the new access token
      localStorage.setItem("access_token", res.data.access);
      return res;
    })
    .catch((err) => err);
};

// location intelligence
const newDevelopmentUrl = `${SERVER_ORIGIN}/location_intelligence/houston_new_dev/`;

export const getNewDevelopment = (year) => {
  // Fetch the data from the backend
  const token = localStorage.getItem("access_token");

  return axios
    .get(`${newDevelopmentUrl}?year=${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get new development data");
      }
      return response.data;
    });
};


// export const getNewDevelopment = (year) => {
//   const token = localStorage.getItem("access_token"); // Get the access token from local storage

//   return axios
//     .get(`${newDevelopmentUrl}?year=${year}`, { // Include the year in the request URL
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//       },
//     })
//     .then((response) => {
//       if (response.status !== 200) {
//         throw Error("Fail to get new development data");
//       }
//       return response.data;
//     });
// };

