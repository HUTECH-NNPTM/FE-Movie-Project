import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";

function LoadingWatch({ loading }) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="relative w-full h-[500px]  bg-[#0e0e0e88]">
      <div className="center-item text-lg z-50 absolute ">
        <div className="flex-col justify-center items-center text-lg">
          <div className="flex justify-center pb-2">
            <img
              className="logo"
              src="https://static2.vieon.vn/production-vieon-web-v5/assets/img/vieon_logo_slogan.png"
            ></img>
          </div>
          <div>Đang tải video vui lòng đợi..!</div>
          <div className="flex justify-center mt-3">
            <SyncLoader
              color={"#ffffff"}
              loading={loading}
              css={override}
              size={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingWatch;
