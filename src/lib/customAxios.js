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

customAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = null;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    //로그인 필요
    if (error.response && error.response.status === 401) {
      alert("로그인 후 시도해주세요.");
      window.location.href = "/signin";
      return new Promise(() => {});
    }

    //토큰 만료
    if(
      error.response?.status === 419 &&
      !originalRequest._retry &&
      originalRequest.url !== '/account/refresh'
    ){
      originalRequest._retry = true;
      try {
        const response = await customAxios.post('/account/refresh', {
          refreshToken,
      });
        localStorage.setItem('accessToken', response.data.data.newAccessToken)

        customAxios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.data.newAccessToken}`;
        
        return customAxios(originalRequest);
      } catch(error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;