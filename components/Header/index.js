import { UserOutlined } from "@ant-design/icons";
import {
  HeartIcon,
  DotsCircleHorizontalIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";

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
          src="https://static.wikia.nocookie.net/jurassicpark/images/5/54/Netflix_logo.png"
        ></img>
      </div>
      <div className="header-content">
        <ul className="header-content__list">
          <Link to="/">
            <li className="header-content__item">Trang chủ</li>
          </Link>
          <Link to="/series">
            <li className="header-content__item">Phim dài tập</li>
          </Link>
          <Link to="/movies">
            <li className="header-content__item">Phim chiếu rạp</li>
          </Link>
        </ul>
      </div>
      <div className="header-right">
        <ul className="header-content__list">
          <li className="header-content__item items-center">
            <SearchCircleIcon className="w-8 h-8 navIcon" />
          </li>
          <li className="header-content__item">
            <HeartIcon className="w-8 h-8 navIcon" />
          </li>
          <li className="header-content__item">
            <Avatar className="navIcon" icon={<UserOutlined />} />
          </li>
          <li className="header-content__item relative">
            <DotsCircleHorizontalIcon
              onClick={handleOpenSideBar}
              className="w-8 h-8 navIcon"
            />
            {openSidebar && <SideBar></SideBar>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
