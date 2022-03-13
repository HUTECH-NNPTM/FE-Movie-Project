import {
  InfoCircleOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";
import React from "react";

function SeriesItem() {
  return (
    <div className="flex-col series lg:w-[250px] lg:h-[150px] m-0 rounded-md cursor-pointer">
      {/* Header */}
      <div className="flex series__item w-full relative h-full bg-red">
        <img
          className="w-full h-full absolute"
          src="https://image.thanhnien.vn/1200x630/Uploaded/2022/wpxlcqjwq/2018_10_04/v1_fhvk.jpg"
        ></img>
      </div>
      <div className="flex bg-[#181818] break-all p-2">Penhouse - Thế giới thượng lưu</div>
      {/* Content */}
      <div className="block bg-[#181818] !text-xs">
        <div className="flex-col w-full h-full">
          {/* Serries Action */}
          <div className="series__action hidden p-2 w-full">
            <div className="flex space-x-2 ">
              <button class="bg-white text-black font-bold py-1 px-4 flex items-center space-x-2">
                <PlayCircleOutlined className="leading-none" />{" "}
                <span>Xem ngay</span>
              </button>
              <button class="bg-transparent border-[1px] text-white font-bold py-1 px-2 flex items-center space-x-2">
                <InfoCircleOutlined className="leading-none" />{" "}
                <span>Chi tiết</span>
              </button>
            </div>
          </div>
          {/* Series Footer */}
          <div className="series__footer hidden w-full h-full !text-[10px] p-2">
            <div className="flex-col items-center w-full h-full">
              <div className="flex items-center">
                <div className="flex">Best series movie</div>
              </div>
              <div className="flex space-x-1 items-center">
                <div className="flex">Action</div>
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
