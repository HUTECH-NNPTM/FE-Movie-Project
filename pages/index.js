import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import movieApi from "../axios/movieApi";
import userApi from "../axios/userApi";
import MainLayOut from "../components/layouts/MainLayout";
import Slider from "../components/Slider";
import Movies from "../features/Movies";
import Series from "../features/Series";

import { loginSuccess } from "../slice/userSlice";

function Home({ sliderList, moviesList }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getInfoUser = async (id) => {
    const data = await userApi.getInfoUser(id);
    dispatch(loginSuccess(data));
  };

  useEffect(() => {
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");

    if (id && token) {
      setLoading(true);
      setTimeout(() => {
        getInfoUser(id);
        setLoading(false);
      }, 2000);
    }
  }, []);

  if (loading) {
    return <div className="fixed center-item text-lg">Loading...</div>;
  }

  return (
    <div className="homePage">
      {/* Slider */}
      <Slider movies={sliderList[0]}></Slider>
      {/* Best Movie */}
      <Movies movies={moviesList}></Movies>
      {/* Best Series */}
      <Series></Series>
    </div>
  );
}

export async function getServerSideProps() {
  const sliderList = await movieApi.random();
  const moviesList = await movieApi.getAllMovies();

  return {
    props: {
      sliderList,
      moviesList,
    }, // will be passed to the page component as props
  };
}

Home.Layout = MainLayOut;

export default Home;
