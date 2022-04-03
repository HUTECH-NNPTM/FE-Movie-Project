import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import Image from "next/image";

function Loading({ loading }) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="fixed w-screen h-screen center-item z-[1000]">
      <div className="relative w-full h-screen bg-black ">
        <div className="center-item text-lg z-50 absolute ">
          <div className="flex-col justify-center items-center text-lg">
            <div className="flex justify-center pb-2">
              <Image src="/logo/logoMovie.png" width={200} height={120}></Image>
            </div>
            <div>Vui lòng chờ trong giây lát!</div>
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
    </div>
  );
}

export default Loading;
