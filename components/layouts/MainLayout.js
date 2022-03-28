import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../axios/userApi";
import MovieInfo from "../../features/MovieInfo";
import Trailer from "../../features/Trailer";
import { loginSuccess } from "../../slice/userSlice";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";
import Head from "next/head";

function MainLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const isOpenTrailer = useSelector((state) => state.trailer.isOpen);
  const isOpenMovieInfo = useSelector((state) => state.modal.isOpen);

  const [loading, setLoading] = useState(false);

  const getInfoUser = async (id) => {
    const data = await userApi.getInfoUser(id);
    if (data) {
      return dispatch(loginSuccess(data));
    }
    return router.push("/auth/login");
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
    } else {
      return router.push("/auth/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>NNRT - Phim mới, Phim hay chỉ có tại NNRT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header></Header>
      {loading && <Loading loading={loading}></Loading>}
      {isOpenTrailer && <Trailer></Trailer>}{" "}
      {isOpenMovieInfo && <MovieInfo></MovieInfo>}
      {children}
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
