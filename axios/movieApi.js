import axiosClient from "./axiosClient";

const movieApi = {
  create: (params) => {
    const url = "/movies/";
    return axiosClient.post(url, params);
  },
  update: (params) => {
    const url = `/movies/${params._id}`;
    return axiosClient.put(url, params);
  },
  random: () => {
    const url = "/movies/random";
    return axiosClient.get(url);
  },
  bestMovie: () => {
    const url = "/movies/bestMovie";
    return axiosClient.get(url);
  },
  getMovieItem: (id) => {
    const url = `/movies/find/${id}`;
    return axiosClient.get(url);
  },
  getAllMovies: (id) => {
    const url = `/movies/allMovies`;
    return axiosClient.get(url);
  },
  deleteMovie: (id) => { 
    const url = `/movies/${id}`;
    return axiosClient.delete(url);
  }
};

export default movieApi;
