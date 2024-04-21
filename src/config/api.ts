// import axios from "axios";

// export const API_BASE_URL = "http://localhost:5454";

// export const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.request.use((config) => {
//   const jwtToken = localStorage.getItem("jwt");
//   config.headers.Authorization = `Bearer ${jwtToken}`;
//   return config;
// });
import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

const jwtToken = localStorage.getItem("jwt");

// const port = window.location.port;

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Đặt Content-Type thành application/json
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${jwtToken}`
  }
});

api.interceptors.request.use((config) => {
  // Kiểm tra xem jwtToken có tồn tại không
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  } else {
    console.log("Không tìm thấy jwtToken trong localStorage");
  }
  //thêm vào header 1 giá trị là cổng mà frontend đang dùng.
  // config.headers['X-Client-Port'] = `${port}`;
  return config;
});
