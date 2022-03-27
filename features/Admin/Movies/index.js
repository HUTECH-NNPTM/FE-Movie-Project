import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import movieApi from "../../../axios/movieApi";
import Loading from "../../../components/Admin/Loading";
import { fetchMovie } from "../../../slice/movieSlice";
import { useRouter } from "next/router";
import MovieItem from "./MovieItem";
import FormAdd from "./FormAdd";

function Movies() {
  const movies = useSelector((state) => state.movies.data);
  const loading = useSelector((state) => state.movies.loading);
  const [openFormAdd, setOpenFormAdd] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const getAllMovies = async () => {
    const movieList = await movieApi.getAllMovies();
    dispatch(fetchMovie(movieList));
  };

  const handleFormAdd = () => {
    setOpenFormAdd(!openFormAdd);
  };

  const handleCloseForm = () => { 
    setOpenFormAdd(false);
  }

  useEffect(() => {
    getAllMovies();
  }, [router]);

  return (
    <div className="bg-gray-100 h-full">
      {/* LOADING */}
      {loading && <Loading></Loading>}
      {/* ADD */}
      {openFormAdd && <FormAdd handleCloseForm={handleCloseForm}></FormAdd>}
      {/* SECTION */}
      <section className="antialiased text-gray-600 h-full px-4">
        <div className="flex flex-col p-5 h-full ">
          {/* Table */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <div className="flex w-full justify-between">
                <h2 className="font-semibold text-gray-800">Movies</h2>
                <button
                  onClick={handleFormAdd}
                  type="button"
                  class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  Add Movie
                </button>
              </div>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">ID</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">Movies</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Genre</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Year</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Limit</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          is Series
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {movies?.map((item, index) => (
                      <MovieItem key={index} item={item}></MovieItem>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movies;
