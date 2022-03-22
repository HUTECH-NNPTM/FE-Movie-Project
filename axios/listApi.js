import axiosClient from "./axiosClient";

const authApi = { 
    getAllList: () => { 
        const url = "/lists";
        return axiosClient.get(url);
    },
    getListById: (id) => { 
        const url = `/lists/${id}`;
        return axiosClient.get(url);
    }
}

export default authApi;