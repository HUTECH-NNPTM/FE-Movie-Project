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

function Home({ sliderList, moviesList, seriesList, moviesNewList, seriesNewList }) {
  return (
    <div className="homePage">
      {/* Slider */}
      <Slider movies={sliderList[0]}></Slider>
      <div className="background-body pb-10">
        {/* New Movie */}
        <Movies movies={moviesNewList} title="PHIM CHIẾU RẠP MỚI NHẤT"></Movies>
        {/* Best Series */}
        <Series series={seriesNewList} title="PHIM TẬP DÀI MỚI NHẤT "></Series>
        {/* Best Movie */}
        <Movies movies={moviesList} title="PHIM CHIẾU RẠP"></Movies>
        {/* Best Series */}
        <Series series={seriesList} title="PHIM TẬP DÀI "></Series>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const sliderList = await movieApi.random();
  const moviesList = await movieApi.bestMovie();
  const seriesList = await listApi.getAllList();
  const moviesNewList = await movieApi.newMovie();
  const seriesNewList = await listApi.newList();

  return {
    props: {
      sliderList,
      moviesList,
      seriesList,
      moviesNewList,
      seriesNewList
    }, // will be passed to the page component as props
  };
}

Home.Layout = MainLayOut;

export default Home;
