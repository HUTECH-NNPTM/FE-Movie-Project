import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { closeTrailer, setTrailerId } from "../../slice/trailerSlice";

function Trailer() {
  const url = useSelector((state) => state.trailer.idTrailer);
  const dispatch = useDispatch();

  const handleClose = async () => {
    dispatch(closeTrailer(false));
    dispatch(setTrailerId(null));
  };

  return (
    <div className="trailer">
      <div className="trailer-content">
        <div className="trailer-close" onClick={handleClose}>
          <CloseCircleOutlined />
        </div>
        <ReactPlayer
          className="z-3"
          url={`${url}`}
          playing={true}
          controls={true}
        />
      </div>
    </div>
  );
}

export default Trailer;
