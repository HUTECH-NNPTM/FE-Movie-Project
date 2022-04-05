import { DotsCircleHorizontalIcon, HeartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Search from "../Search";
import SideBar from "../SideBar";

function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openFormSearch, setFormSearch] = useState(false);

  const handleOpenSideBar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleScrollNewMovie = () => {
    const ref = document.getElementById("scroll-new-movie");
    ref.scrollIntoView({ behavior: "smooth", block: "center"});
    ref.animate([
      {
        duration: 1000,
        iterations: Infinity,
      },
    ]);
  };

  const handleScrollNewSeries = () => {
    const ref = document.getElementById("scroll-new-series");
    ref.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSearchFeature = () => {
    setFormSearch(!openFormSearch);
  };

  return (
    <div className="!sticky top-0 left-0 right-0 bg-[#00000075] flex items-center z-50">
      <div className="w-[10%]">
        <Image src="/logo/logo.png" width={100} height={70}></Image>
      </div>
      <div className="flex-1">
        <ul className="header-content__list text-sm">
          <Link href="/">
            <li className="header-content__item">Trang chủ</li>
          </Link>
          <li onClick={handleScrollNewMovie} className="header-content__item">
            Phim Chiếu Rạp{" "}
          </li>
          <li onClick={handleScrollNewSeries} className="header-content__item">
            Phim Tập Dài{" "}
          </li>
        </ul>
      </div>
      <div className="header-right">
        <ul className="header-content__list items-center">
          <li className="header-content__item items-center">
            <Search openFormSearch={openFormSearch}></Search>
          </li>
          <li className="header-content__item">
            <HeartIcon className="w-6 h-6 navIcon" />
          </li>
          <li className="header-content__item relative">
            <DotsCircleHorizontalIcon
              onClick={handleOpenSideBar}
              className="w-6 h-6 navIcon"
            />
            {openSidebar && <SideBar></SideBar>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
