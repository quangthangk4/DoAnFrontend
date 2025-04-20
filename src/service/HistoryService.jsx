import axiosClient from "../api/axiosConfig";

const historyApi = {
  getHistory: () => axiosClient.get(`/yolohome/history`),
};

export default historyApi;
