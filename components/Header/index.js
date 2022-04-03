import {
  DotsCircleHorizontalIcon,
  HeartIcon
} from "@heroicons/react/outline";
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

  const handleSearchFeature = () => {
    setFormSearch(!openFormSearch);
  };

  return (
    <div className="header z-40">
      <div className="header-left">
        <Image src="/logo/logo.png" width={100} height={70}></Image>
      </div>
      <div className="header-content">
        <ul className="header-content__list text-sm">
          <Link href="/">
            <li className="header-content__item">Trang chủ</li>
          </Link>
          <Link href="/series">
            <li className="header-content__item">Phim Hay</li>
          </Link>
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
