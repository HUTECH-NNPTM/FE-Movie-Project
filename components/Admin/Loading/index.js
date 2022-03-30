import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

function Loading({ loading }) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="fixed w-full h-screen background-tranparent text-black z-50 ">
      <div className="center-item text-lg z-50 absolute">
        <div className="flex-col justify-center items-center  text-lg">
          <div className="text-white">Đang xử lý tác vụ vui lòng chờ!</div>
          <div className="flex justify-center mt-3">
            <HashLoader
              color={"#0080FF"}
              loading={loading}
              css={override}
              size={140}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
