import { UserOutlined } from "@ant-design/icons";
import {
  DotsCircleHorizontalIcon, HeartIcon, SearchCircleIcon
} from "@heroicons/react/outline";
import { Avatar } from "antd";
import React, { useState } from "react";
import SideBar from "../SideBar";
import Link from 'next/link'


function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSideBar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="header z-40">
      <div className="header-left">
        <img
          className="logo"
          src="https://static2.vieon.vn/production-vieon-web-v5/assets/img/vieon_logo_slogan.png"
        ></img>
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
        <ul className="header-content__list">
          <li className="header-content__item items-center">
            <SearchCircleIcon className="w-6 h-6 navIcon" />
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
