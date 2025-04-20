import axiosClient from "../api/axiosConfig";

const adafruitApi = {
  control: (ctrlType, value, username) =>
    axiosClient.post(
      `/yolohome/adafruit/${ctrlType}?value=${value}&username=${username}`
    ),

  getData: () => axiosClient.get(`yolohome/adafruit/data`),

  unlockDoor: (data) => axiosClient.post("/yolohome/door/unlock", data),
  lockDoor: () => axiosClient.post("/yolohome/door/lock"),
  unlockDoor: () => axiosClient.get("/yolohome/door/status"),
  changePassword: (data) => axiosClient.put("/yolohome/door/update-password", data),
};

export default adafruitApi;
