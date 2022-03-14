import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import Trailer from "../../features/Trailer";
import MovieInfo from "../../features/MovieInfo";

function MainLayout({ children }) {
  const router = useRouter();
  const isOpenTrailer = useSelector((state) => state.trailer.isOpen);
  const isOpenMovieInfo = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      return router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Header></Header>
      {isOpenTrailer && <Trailer></Trailer>}{" "}
      {isOpenMovieInfo && <MovieInfo></MovieInfo>}
      {children}
    </>
  );
}

export default MainLayout;
