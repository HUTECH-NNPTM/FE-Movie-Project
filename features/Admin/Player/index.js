import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import ReactPlayer from "react-player";

function PlayerAdmin({url, handleCloseVideo}) {
  return (
    <div className="fixed center-item z-50 bg-gray-200 rounded-md w-[700px]">
      <div className="relative">
        <div className="absolute top-3 right-3 z-[100] cursor-pointer " onClick={() => handleCloseVideo()}>
          <CloseCircleOutlined className="text-2xl" />
        </div>
        <ReactPlayer
          width={700}
          height={500}
          url={`${url}`}
          playing={true}
          controls={true}
        />
      </div>
    </div>
  );
}

export default PlayerAdmin;
