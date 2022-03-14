import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import movieApi from "../../../axios/movieApi";
import MainLayout from "../../../components/layouts/MainLayout";
import WatchItem from "../../../features/Watch/WatchItem";

function WacthMovies({ player }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="fixed center-item text-lg">Loading....</div>;
  }

  return (
    <div className="watchPage">
      <div className="watch mt-[60px]">
        <div
          className={`watch-left ${player?.isSeries ? " justify-center" : ""}`}
        >
          <div className="watch-video">
            <ReactPlayer
              url={`${player?.video}`}
              width="100%"
              height={500}
              controls={true}
            />
          </div>
        </div>
        {/* {player.isSeries && ( */}
        <React.Fragment>
          <div className="watch-right">
            <div className="watch-headerList">
              <div className="watch-title">Danh sách tập</div>
              <div className="watch-comment">Bình luận</div>
            </div>
            <hr></hr>
            <div className="watch-contentList">
              <div className="watch-totalList">Tổng số: 5 video</div>
              <div className="watch-episode">Tập: 5</div>
            </div>
            <div className="watch-list">
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
              <WatchItem></WatchItem>
            </div>
          </div>
        </React.Fragment>
      </div>
      <div className="watch-content">
        <div className="watch-content__title">{player?.title}</div>
        <div className="watch-content__view">
          <span>241,770</span> lượt xem
        </div>
        <div className="watch-content__action">
          <div>
            <Button type="danger" icon={<PoweroffOutlined />}>
              Thích
            </Button>
          </div>
          <div>
            <Button icon={<PoweroffOutlined />}>Theo dõi</Button>
          </div>
          <div>
            <Button type="primary" icon={<PoweroffOutlined />}>
              Share
            </Button>
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
    fallback: false,
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
