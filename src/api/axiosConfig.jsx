import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080', // URL gốc của API
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // (tuỳ chọn) timeout sau 10 giây
  });

export default axiosClient;