import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import movieApi from "../../../axios/movieApi";
import { setIdMovie } from "../../../slice/seriesSlice";

function WatchItem({ data }) {
  const idActive = useSelector((state) => state.series.idMovie);
  const dispath = useDispatch();

  const [item, setItem] = useState({});
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (item) {
      if (idActive == item._id) {
        setActive(true);
      }else {
        setActive(false);
      }
    }
  });

  useEffect(async () => {
    const response = await movieApi.getMovieItem(data);
    setItem(response);
  }, [data]);

  const handleWatched = (id) => {
    dispath(setIdMovie(id));
  };

  return (
    <div
      onClick={() => handleWatched(item._id)}
      className={`watch-item p-2 bg-black ${active && "itemActive"} `}
    >
      <div className="watch-itemImage">
        <img className="watch-image w-[200px] h-full" src={item.img}></img>
      </div>
      <div className="watch-itemTitle text-xs">{item.title}</div>
    </div>
  );
}

export default WatchItem;
