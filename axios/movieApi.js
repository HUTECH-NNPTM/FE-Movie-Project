import axiosClient from "./axiosClient";

const movieApi = {
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
  }
};

export default movieApi;
