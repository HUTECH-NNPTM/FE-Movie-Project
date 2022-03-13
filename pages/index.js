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

  if (typeof window !== "undefined") {
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");

    const getInfoUser = async (id) => {
      const data = await userApi.getInfoUser(id);
      dispatch(loginSuccess(data));
    };

    useEffect(() => {
      if (id && token) {
        getInfoUser(id);
      }
    }, [id]);
  }

  return (
    <div className="homePage">
      {/* Slider */}
      <Slider sliders={sliderList[0]}></Slider>
      {/* Best Movie */}
      <Movies movies={moviesList}></Movies>
      {/* Best Series */}
      <Series></Series>
    </div>
  );
}

export async function getStaticProps() {
  const sliderList = await movieApi.random();
  const moviesList = await movieApi.bestMovie();

  return {
    props: {
      sliderList,
      moviesList
    }, // will be passed to the page component as props
    revalidate: 1
  };
}

Home.Layout = MainLayOut;

export default Home;
