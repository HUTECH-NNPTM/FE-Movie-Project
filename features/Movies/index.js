import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import movieApi from "../../axios/movieApi";
import MovieItem from "./MovieItem";

function BestMovie() {
  const refScroll = useRef();
  const [positionX, setPositionX] = useState(0);

  //state
  const [movieList, setMovieList] = useState([]);

  const getListBestMovie = async () => {
    try {
      const data = await movieApi.bestMovie();
      setMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListBestMovie();
  }, []);

  const handleMoveLeft = () => {
    if(positionX == -400 ) { 
      return;
    }
    refScroll.current.style.transform = `translateX(${positionX - 200}px)`;
    setPositionX(positionX - 200);
    refScroll.current.style.transitionDuration = "1s";
  };

  const handleMoveRight = () => {
    if(positionX == 0 ) { 
      return;
    }
    refScroll.current.style.transform = `translateX(${positionX + 200}px)`;
    setPositionX(positionX + 200);
    refScroll.current.style.transitionDuration = "1s";
  };

  return (
    <div className="list">
      <div className="list-btn">
        <div className="list-title">Best Movie</div>
        <div className="list-btn__left" onClick={handleMoveLeft}>
          <DoubleLeftOutlined />
        </div>
        <div className="list-btn__right" onClick={handleMoveRight}>
          <DoubleRightOutlined />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="list-all " ref={refScroll}>
          {movieList.map((data, index) => {
            return <MovieItem key={index} data={data}></MovieItem>;
          })}
        </div>
      </div>
    </div>
  );
}

export default BestMovie;
