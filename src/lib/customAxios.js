// /** @format */
// import axios from "axios";
//
// const { REACT_APP_API_URL } = process.env;
//
// const getToken = () => {
//   return localStorage.getItem('accessToken');
// };
//
//
// const customAxios = axios.create({
//   baseURL: REACT_APP_API_URL + "/api",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//   }
// });
//
//
//
// // customAxios.interceptors.request.use(
// //   (config) => {
// //     const token = getToken();
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     } else {
// //       config.headers.Authorization = null;
// //     }
// //     return config;
// //   }
// // );
// //
// //
// // customAxios.interceptors.response.use(
// //   response => response,
// //   error => {
// //     if (error.response && error.response.status === 401) {
// //       alert("로그인 후 시도해주세요.");
// //       window.location.href = '/signin';
// //       return new Promise(() => {});
// //     }
// //
// //     return Promise.reject(error);
// //   }
// // );
//
// export default customAxios;

/** @format */
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const customAxios = axios.create({
  baseURL: REACT_APP_API_URL + "/api",
});

customAxios.interceptors.request.use((config) => {
  const token = getToken();
  const refreshToken = getRefreshToken();
  if (token && refreshToken) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['RefreshToken'] = refreshToken;
  } else {
    config.headers.Authorization = null;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("로그인 후 시도해주세요.");
      window.location.href = "/signin";
      return new Promise(() => {});
    }

    return Promise.reject(error);
  },
);

export default customAxios;