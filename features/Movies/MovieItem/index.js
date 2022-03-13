import {
  HeartOutlined,
  PlayCircleOutlined,
  PushpinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { openTrailer, setTrailerId } from "../../../slice/trailerSlice";

function ListItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const data = props.data;

  const handleTrailer = async () => {
    await dispatch(openTrailer(true));
    await dispatch(setTrailerId(data.trailer));
  };

  const handleGoToWatch = (id) => {
    return history.push(`/watch/${id}`);
  };

  return (
    <div className="listItem bg-[#181818] cursor-pointer">
      <div className="w-full relative h-[200px]">
        <img
          className="listItem-image w-full h-full  rounded-sm absolute"
          src={data.img}
        ></img>
        <div className="absolute bottom-0 p-2 w-full">
          <div className="flex space-x-5 justify-center">
            <div
              onClick={() => handleGoToWatch(data._id)}
              className="listItem-button"
              title="watching"
            >
              <PlayCircleOutlined className="leading-none" />
            </div>
            <div
              className="listItem-button"
              title="Trailer"
              onClick={handleTrailer}
            >
              <YoutubeOutlined className="leading-none" />
            </div>
            <div className="listItem-button" title="Like">
              <HeartOutlined className="leading-none" />
            </div>
            <div className="listItem-button" title="Unlike">
              <PushpinOutlined className="leading-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="listItem-content">
        <div className="listItem-content__footer">
          <div className="listItem-title">{data.title}</div>
          <div className="listItem-timer">1 tiếng 14 phút</div>
          <div className="relative h-[58px] overflow-hidden">
            <div className="listItem-desc absolute">{data.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
