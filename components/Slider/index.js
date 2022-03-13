import { InfoCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { openModalDetail, setModalId } from "../../slice/modalSlice";

function Slider({ sliders }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(sliders);
  }, [sliders])
  
  const handleGoToWatch = (id) => {
    return router.push(`/watch/${id}`);
  };

  const handleOpenModal = (id) => {
    dispatch(openModalDetail(true));
    dispatch(setModalId(id));
  };

  return (
    <div className="slider object-cover">
      <div className="w-full h-full absolute z-4 slider-background"></div>
      <ReactPlayer
        className="z-3"
        url={`${movies?.video}`}
        width="100%"
        height="100vh"
        playing={true}
        muted="true"
        loop="true"
      />
      <div className="slider-action z-5">
        <div className="relative h-[168px] w-[700px] overflow-hidden">
          <div className="slider-action__desc">
            {movies?.genre} - {movies?.title}
          </div>
          <div className="slider-action__desc absolute break-all">
            {movies?.desc}
          </div>
        </div>

        <div className="slider-action__button space-x-2">
          <button
            onClick={() => handleGoToWatch(movies._id)}
            class="bg-white text-black font-bold py-2 px-8 flex items-center space-x-2"
          >
            <PlayCircleOutlined className="text-lg leading-none" />{" "}
            <span>Xem Ngay</span>
          </button>
          <button
            onClick={() => handleOpenModal(movies._id)}
            class="bg-transparent border-[1px] text-white font-bold py-2 px-8 flex items-center space-x-2"
          >
            <InfoCircleOutlined className="text-lg leading-none" />{" "}
            <span>Chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
