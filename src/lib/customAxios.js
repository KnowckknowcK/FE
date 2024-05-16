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
  return localStorage.getItem('accessToken');
};


const customAxios = axios.create({
  baseURL: REACT_APP_API_URL + "/api",
});


customAxios.interceptors.request.use(
    (config) => {
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTcxNTgyOTA2NywiZXhwIjoxNzE1ODMyNjY3fQ.TdmHplzOESWiiVfEEVSn9XBEdmD9FukW40Pt14wE6Nw";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = null;
      }
      return config;
    }
);


customAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        alert("로그인 후 시도해주세요.");
        window.location.href = '/signin';
        return new Promise(() => {});
      }

      return Promise.reject(error);
    }
);

export default customAxios;