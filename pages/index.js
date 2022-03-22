import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import listApi from "../axios/listApi";
import movieApi from "../axios/movieApi";
import userApi from "../axios/userApi";
import MainLayOut from "../components/layouts/MainLayout";
import Loading from "../components/Loading";
import Slider from "../components/Slider";
import Movies from "../features/Movies";
import Series from "../features/Series";
import { loginSuccess } from "../slice/userSlice";


function Home({ sliderList, moviesList, seriesList }) {
  return (
    <div className="homePage">
      {/* Slider */}
      <Slider movies={sliderList[0]}></Slider>
      {/* Best Movie */}
      <Movies movies={moviesList}></Movies>
      {/* Best Series */}
      <Series series={seriesList}></Series>
    </div>
  );
}

export async function getServerSideProps() {
  const sliderList = await movieApi.random();
  const moviesList = await movieApi.bestMovie();
  const seriesList = await listApi.getAllList();

  return {
    props: {
      sliderList,
      moviesList,
      seriesList,
    }, // will be passed to the page component as props
  };
}

Home.Layout = MainLayOut;

export default Home;
