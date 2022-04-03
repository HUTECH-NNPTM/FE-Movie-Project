import axiosClient from "./axiosClient";

const movieApi = {
  addCommentMovie: (params) => {
    const url = `/movies/comments/${params.id}`;
    return axiosClient.put(url, {
      userId: params.userId,
      message: params.message,
    });
  },
  newMovie: () => {
    const url = "/movies/newMovie";
    return axiosClient.get(url);
  },
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
  getAllMovies: () => {
    const url = `/movies/allMovies`;
    return axiosClient.get(url);
  },
  getMovieList: () => {
    const url = `/movies/movieList`;
    return axiosClient.get(url);
  },
  deleteMovie: (id) => {
    const url = `/movies/${id}`;
    return axiosClient.delete(url);
  },
  searchMovie: (name) => {
    const url = `/movies/search/`;
    return axiosClient.get(url, { params: { title: name } });
  },
};

export default movieApi;
