import { HeartIcon, ShareIcon, StatusOnlineIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";
import movieApi from "../../../axios/movieApi";
import MainLayout from "../../../components/layouts/MainLayout";
import Loading from "../../../components/Loading";
import Comments from "../../../features/Comments";

function WacthMovies({ player }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading loading={router.isFallback}></Loading>;
  }

  return (
    <div className="watchPage bg-[#101010]">
      <div className="watch mt-[100px] ">
        <div
          className={`watch-left ${player?.isSeries ? " justify-center" : ""}`}
        >
          <div className="flex flex-wrap justify-center">
            <div className="flex-2">
              <ReactPlayer
                url={`${player?.video}`}
                width="100%"
                height="500px"
                controls={true}
              />
            </div>
            <div className="flex-1">
              <Comments movieId={player?._id}></Comments>
            </div>
          </div>
        </div>
      </div>
      <div className="watch-content">
        <div className="watch-content__title">{player?.title}</div>
        <div className="watch-content__view">
          <span>241,770</span> lượt xem
        </div>
        <div className="watch-content__action">
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              <div>Thích</div>
              <HeartIcon className="w-6 h-6 leading-none" />
            </button>
          </div>
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
              <div>Theo dõi</div>
              <StatusOnlineIcon className="w-6 h-6 leading-none" />
            </button>
          </div>
          <div>
            <button className="flex items-center bg-transparent	 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              <div>Chia sẻ</div>
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
  const movies = await movieApi.getAllMovies();
  let paths = movies.map((movie) => `/watch/movies/${movie._id}`);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const player = await movieApi.getMovieItem(params.id);
  return {
    props: {
      player,
    },
    revalidate: 1,
  };
};

WacthMovies.Layout = MainLayout;

export default WacthMovies;
