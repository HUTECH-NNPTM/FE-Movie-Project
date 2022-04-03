import React, { useEffect, useState } from "react";
import DataSearch from "../../features/DataSearch";
import { XCircleIcon } from "@heroicons/react/solid";
import movieApi from "../../axios/movieApi";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";

function Search() {
  const [openDataSearch, setOpenDataSearch] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let variableTimeOut = "";

  const handleOpenDataSearch = () => {
    setOpenDataSearch(true);
  };

  const handleCloseDataSearch = () => {
    setOpenDataSearch(false);
  };

  const handleChange = async (e) => {
    let value = e.target.value;
    clearTimeout(variableTimeOut);
    setLoading(true);
    variableTimeOut = setTimeout(async () => {
      const response = await movieApi.searchMovie(value);
      setData(response);
      setLoading(false);
    }, 1000);
  };

  const getMovieData = async () => {
    const response = await movieApi.searchMovie("");
    setData(response);
  };

  useEffect(() => {
    getMovieData();
    return () => {
      getMovieData();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-72 relative">
        <div className="input-group relative flex flex-wrap items-stretch w-full">
          <input
            onChange={handleChange}
            onFocus={handleOpenDataSearch}
            type="search"
            className="text-white relative flex-auto min-w-0 block w-full px-3 text-base font-normal bg-transparent bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:!outline-none "
            placeholder="Tìm kiếm...."
            aria-label="Search"
          />
        </div>
        {openDataSearch && (
          <div className="w-72 h-64 max-h-64 absolute bg-[#181818] p-1 mt-1 overflow-y-auto scrollbar-thin">
            <div className="relative">
              <div className="absolute top-0 right-1 m-2">
                <XCircleIcon
                  onClick={handleCloseDataSearch}
                  className="w-6 h-6 text-white"
                ></XCircleIcon>
              </div>
              <div className="flex text-xs p-3">Tìm kiếm nhiều nhất</div>
              <hr></hr>
              {loading ? (
                <div className="flex justify-center items-center h-52">
                  <GridLoader
                    color={"#ffffff"}
                    loading={loading}
                    css={override}
                    margin={2}
                    size={15}
                  />
                </div>
              ) : (
                <div className="flex-col p-1">
                  {data.length == 0 ? (
                    <div className="p-1 text-xs">
                      Không tìm thấy dữ liệu....
                    </div>
                  ) : (
                    data?.map((item, index) => (
                      <DataSearch key={index} item={item}></DataSearch>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
