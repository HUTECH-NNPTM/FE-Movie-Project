import axiosClient from "./axiosClient";

const listApi = {
  create: (params) => {
    const url = "/lists";
    return axiosClient.post(url, params);
  },
   newList: () => {
    const url = "/lists/newList";
    return axiosClient.get(url);
  },
  getAllList: () => {
    const url = "/lists";
    return axiosClient.get(url);
  },
  delete: (id) => {
    const url = `/lists/${id}`;
    return axiosClient.delete(url);
  },
  update: (params) => {
    const url = `/lists/${params._id}`;
    return axiosClient.put(url, params);
  },
  getListById: (id) => {
    const url = `/lists/${id}`;
    return axiosClient.get(url);
  },
};

export default listApi;
