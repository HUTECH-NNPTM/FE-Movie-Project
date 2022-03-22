import {
  HeartOutlined,
  PlayCircleOutlined,
  PushpinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openTrailer, setTrailerId } from "../../../slice/trailerSlice";

function ListItem(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = props.data;

  const handleTrailer =() => {
    dispatch(openTrailer(true));
    dispatch(setTrailerId(data.trailer));
  };

  return (
    <div className="listItem bg-[#181818] cursor-pointer rounded-md">
      <div className="w-full relative h-[200px] ">
        <img
          className="listItem-image w-full h-full rounded-md absolute"
          src={data.img}
        ></img>
        <div className="absolute bottom-0 p-2 w-full">
          <div className="flex space-x-5 justify-center">
            <Link href={`/watch/movies/${data._id}`}>
              <div className="listItem-button" title="watching">
                <PlayCircleOutlined className="leading-none" />
              </div>
            </Link>
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
        <div className="listItem-content__footer overflow-hidden">
          <div className="listItem-title">{data.title}</div>
          <div className="listItem-timer">1 tiếng 14 phút</div>
          <div className="relative">
            <div className="listItem-desc">{data.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
