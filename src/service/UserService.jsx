import axiosClient from "../api/axiosConfig";

const userApi = {
  create: (data) => axiosClient.post("/yolohome/users/registration", data),
  login: (data) => axiosClient.post("/yolohome/users/login", data),
};

export default userApi;
