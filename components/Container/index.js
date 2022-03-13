import React from "react";
import { useSelector } from "react-redux";
import MovieInfo from "../../features/MovieInfo";
import Trailer from "../../features/Trailer";
import Header from "../Header";

function Container({ children }) {
  const isOpenTrailer = useSelector((state) => state.trailer.isOpen);
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  return (
    <React.Fragment>
      {/* Modal */}
      {isOpenTrailer && <Trailer />}
      {isOpenModal && <MovieInfo></MovieInfo>}
      {/* Content */}
      <Header></Header>
      {children}
    </React.Fragment>
  );
}

export default Container;
