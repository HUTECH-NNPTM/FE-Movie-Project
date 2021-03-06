import { CloseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listApi from "../../axios/listApi";
import movieApi from "../../axios/movieApi";
import { closeModalDetail } from "../../slice/modalSlice";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Link from "next/link";

function MovieInfo() {
  const dispatch = useDispatch();
  const router = useRouter();

  const id = useSelector((state) => state.modal.idModal);
  const [movies, setMovies] = useState({});
  const [isList, setIsList] = useState(false);

  const getDataMovieItem = async () => {
    try {
      if (id.type == "series") {
        let data = await listApi.getListById(id.data);
        setMovies(data);
        setIsList(true);
      } else if(id.type == "movies") {
        let data = await movieApi.getMovieItem(id.data);
        setMovies(data);
        setIsList(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movies);

  useEffect(() => {
    getDataMovieItem();
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModalDetail(false));
  };

  return (
    <div class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pb-20">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="flex-col z-50 w-[600px] bg-black rounded-md overflow-hidden mt-4">
          <div className="relative w-full">
            <div className="absolute w-full h-full bg-[#0e0e0e88] "></div>
            <ReactPlayer
              className="h-full"
              url={`${movies.trailer}`}
              width="100%"
              playing={true}
              muted="true"
            />
            <div className="absolute top-0 right-0 m-2">
              <CloseCircleOutlined
                onClick={handleCloseModal}
                className="text-3xl cursor-pointer leading-none"
              />
            </div>
            <div className="absolute center-item">
              <div className="flex space-x-3">
                {id.type == "movies" ? (
                  <Link href={`/watch/movies/${movies._id}`}>
                    <button onClick={handleCloseModal} class="bg-[#0e0e0e88] text-white border-[1px] font-bold py-2 px-12 flex items-center space-x-2 ">
                      <PlayCircleOutlined style={{ fontSize: "25px" }} />{" "}
                      <span>Xem ngay</span>
                    </button>
                  </Link>
                ) : (
                  <Link href={`/watch/series/${movies._id}`}>
                    <button onClick={handleCloseModal} class="bg-[#0e0e0e88] text-white border-[1px] font-bold py-2 px-12 flex items-center space-x-2 ">
                      <PlayCircleOutlined style={{ fontSize: "25px" }} />{" "}
                      <span>Xem ngay</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex-col p-3">
            <div className="flex items-center">
              <div className="flex-auto w-64 p-1">
                <div className="flex text-lg">M?? t???: </div>
                <p className="break-all text-xs">{movies.desc}</p>
              </div>
              <div className="flex-auto w-32 flex-col p-1 text-xs">
                <div className="flex space-x-3">
                  <div className="text-xs text-gray-400">T??n Phim:</div>
                  <div className="text-xs text-gray-500">{movies.title}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400">Th??? lo???i:</div>
                  <div className="text-xs text-gray-500">{movies.genre}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400">N??m:</div>
                  <div className="text-xs text-gray-500">{movies.year}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400">S??? t???p</div>
                  <div className="text-xs text-gray-500">{movies.limit}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col p-3">B??nh lu???n</div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
