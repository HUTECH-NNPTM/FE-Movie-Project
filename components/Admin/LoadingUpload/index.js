import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

function LoadingUpload({ loading, uploaded }) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-[700px] text-black z-50 h-full ">
      <div className="center-item text-lg z-50 absolute !top-[35%]">
        <div className="flex-col justify-center items-center  text-lg">
          <div className="text-white">Đang upload file vui lòng chờ !</div>
          <div className="flex justify-center mt-3">
            <PropagateLoader
              color={"#0080FF"}
              loading={loading}
              css={override}
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingUpload;
