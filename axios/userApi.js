import axiosClient from "./axiosClient";

const userApi = {
  getInfoUser: (id) => {
    const url = `/users/find/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
