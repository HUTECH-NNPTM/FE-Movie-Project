import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/solid'


function BestMovie({movies, title}) {
  const refScroll = useRef();
  const [positionX, setPositionX] = useState(0);

  //state
  const [movieList, setMovieList] = useState([]);


  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  const handleMoveRight = () => {
    if(positionX == -1000 ) { 
      return;
    }
    refScroll.current.style.transform = `translateX(${positionX - 200}px)`;
    setPositionX(positionX - 200);
    refScroll.current.style.transitionDuration = "1s";
  };

  const handleMoveLeft = () => {
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
        <div className="list-title">{title}</div>
        <div className="list-btn__left" onClick={handleMoveLeft}>
          <ArrowCircleLeftIcon className="w-8 h-8 leading-none" />
        </div>
        <div className="list-btn__right" onClick={handleMoveRight}>
          <ArrowCircleRightIcon className="w-8 h-8 leading-none" />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="list-all " ref={refScroll}>
          {movieList?.map((data, index) => {
            return <MovieItem key={index} data={data}></MovieItem>;
          })}
        </div>
      </div>
    </div>
  );
}

export default BestMovie;
