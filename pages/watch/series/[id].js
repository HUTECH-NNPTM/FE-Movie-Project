import { HeartIcon, ShareIcon, StatusOnlineIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import listApi from "../../../axios/listApi";
import movieApi from "../../../axios/movieApi";
import MainLayout from "../../../components/layouts/MainLayout";
import LoadingWatch from "../../../components/LoadingWatch";
import WatchItem from "../../../features/Watch/WatchItem";
import { setIdMovie } from "../../../slice/seriesSlice";


function WatchSeries({ player }) {
  const movieID = useSelector((state) => state.series.idMovie);
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getMovieOfSeriesWatch = async () => {
    const response = await movieApi.getMovieItem(movieID);
    setData(response);
  };

  const getFirstMovieOfSeriesWatch = async () => {
    const response = await movieApi.getMovieItem(player.content[0]);
    dispatch(setIdMovie(player.content[0]));
    setData(response);
  };

  useEffect(() => {
    getFirstMovieOfSeriesWatch();
  }, [player]);

  useEffect(() => {
    if (movieID) {
      getMovieOfSeriesWatch();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [movieID]);

  return (
    <div className="watchPage">
      <div className="watch mt-[70px]">
        <div
          className={`watch-left ${player?.isSeries ? " justify-center" : ""}`}
        >
          <div className="watch-video">
            {loading ? (
              <LoadingWatch loading={true}></LoadingWatch>
            ) : (
              <ReactPlayer
                url={`${data?.video}`}
                width="100%"
                height={500}
                controls={true}
              />
            )}
          </div>
        </div>
        <React.Fragment>
          <div className="watch-right bg-[#181818]">
            <div className="watch-headerList">
              <div className="watch-title">Danh s??ch t???p</div>
              <div className="watch-comment">B??nh lu???n</div>
            </div>
            <hr></hr>
            <div className="watch-contentList">
              <div className="watch-totalList">
                T???ng s???: {player?.content?.length} video
              </div>
            </div>
            <div className="watch-list">
              {player?.content?.map((item, index) => (
                <WatchItem key={index} data={item}></WatchItem>
              ))}
            </div>
          </div>
        </React.Fragment>
      </div>
      <div className="watch-content">
        <div className="watch-content__title font-bold">SERIES: {player?.title}</div>
        <div className="flex text-md">{data && data?.title}</div>
        <div className="watch-content__view">
          <span>241,770</span> l?????t xem
        </div>
        <div className="watch-content__action">
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              <div>Th??ch</div>
              <HeartIcon className="w-6 h-6 leading-none" />
            </button>
          </div>
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              <div>Theo d??i</div>
              <StatusOnlineIcon className="w-6 h-6 leading-none" />
            </button>
          </div>
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              <div>Chia s???</div>
              <ShareIcon className="w-6 h-6 leading-none" />
            </button>
          </div>
        </div>
        <div className="watch-content-desc">{player?.desc}</div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const series = await listApi.getAllList();
  let paths = series.map((item) => `/watch/series/${item._id}`);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const player = await listApi.getListById(params.id);
  return {
    props: {
      player,
    },
    revalidate: 1,
  };
};

WatchSeries.Layout = MainLayout;

export default WatchSeries;
