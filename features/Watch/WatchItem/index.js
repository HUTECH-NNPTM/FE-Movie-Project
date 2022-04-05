import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import movieApi from "../../../axios/movieApi";
import { setIdMovie } from "../../../slice/seriesSlice";

function WatchItem({ data }) {
  const idActive = useSelector((state) => state.series.idMovie);
  const dispath = useDispatch();

  const [item, setItem] = useState(null);
  const [active, setActive] = useState(false);

  const getDataWatchItem = async () => {
    try {
      const response = await movieApi.getMovieItem(data);
      setItem(response);
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (item) {
      if (idActive == item._id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  });

  useEffect(() => {
    getDataWatchItem();
  }, []);

  const handleWatched = (id) => {
    dispath(setIdMovie(id));
  };

  return (
    <React.Fragment>
      {item?._id ? (
        <div
          onClick={() => handleWatched(item._id)}
          className={`watch-item cursor-pointer p-2 bg-black ${
            active && "itemActive"
          } `}
        >
          <div className="flex items-center overflow-hidden">
            <img
              className="watch-image flex-shrink-0 w-[100px] h-[80px] object-cover"
              src={item.img}
            ></img>
          </div>
          <div className="flex-1 p-3 text-xs">{item.title}</div>
        </div>
      ) : (
        <div
          className={`watch-item cursor-pointer p-2 bg-black ${
            active && "itemActive"
          } `}
        >
          <div className="flex items-center overflow-hidden">
            <img
              className="watch-image flex-shrink-0 w-[100px] h-[80px] object-cover"
              src="https://cdn.staticcrate.com/stock-hd/effects/footagecrate-red-error-icon-prev-full.png"
            ></img>
          </div>
          <div className="flex-1 p-3 text-xs">Video đã bị ẩn hoặc xóa</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default WatchItem;
