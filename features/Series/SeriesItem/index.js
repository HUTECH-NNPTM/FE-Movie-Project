import { InfoCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openModalDetail, setModalId } from "../../../slice/modalSlice";
function SeriesItem({ data }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenModal = (id) => {
    let dataObject = {
      data: id,
      type: "series",
    };
    dispatch(openModalDetail(true));
    dispatch(setModalId(dataObject));
  };

  return (
    <div className="flex-col series w-[300px] h-[150px] m-0 rounded-md cursor-pointer">
      {/* Header */}
      <div className="flex series__item w-full relative h-full bg-red">
        <img
          className="w-full h-full object-cover absolute"
          src={data.img}
        ></img>
      </div>
      <div className="flex bg-[#181818] break-all p-2">{data.title}</div>
      {/* Content */}
      <div className="block bg-[#181818] !text-xs">
        <div className="flex-col w-full h-full">
          {/* Serries Action */}
          <div className="series__action hidden p-2 w-full">
            <div className="flex space-x-2 ">
              <button
                onClick={() => router.push(`/watch/series/${data._id}`)}
                className="bg-white text-black font-bold py-1 px-4 flex items-center space-x-2"
              >
                <PlayCircleOutlined className="leading-none" />{" "}
                <span>Xem ngay</span>
              </button>
              <button
                onClick={() => handleOpenModal(data._id)}
                className="bg-transparent border-[1px] text-white font-bold py-1 px-2 flex items-center space-x-2"
              >
                <InfoCircleOutlined className="leading-none" />{" "}
                <span>Chi tiết</span>
              </button>
            </div>
          </div>
          {/* Series Footer */}
          <div className="series__footer hidden w-full h-full !text-[10px] p-2">
            <div className="flex-col items-center w-full h-full">
              <div className="flex items-center">
                <div className="flex">{data.type}</div>
              </div>
              <div className="flex space-x-1 items-center">
                <div className="flex">{data.genre}</div>
                <div>|</div>
                <div className="flex">1 tiếng 14 phút</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesItem;
