import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../slice/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const user = useSelector((state) => state.user.info);
  const [openSetting, setOpenSetting] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutSuccess());
    return router.push("/auth/login");
  };

  return (
    <div className="bg-gray-800 !sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center">
            <div className="flex">
              <Image src="/logo/logo.png" width={100} height={70}></Image>
            </div>
            <div className="">
              <div className="flex space-x-4">
                {/* <Link href={"/admin/dashboard"}>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </Link> */}
                <Link href={"/admin/movies"}>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Video
                  </a>
                </Link>
                <Link href={"/admin/series"}>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Series
                  </a>
                </Link>
                {/* <Link href={"/admin/users"}>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Users
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              {/* Heroicon name: outline/bell */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={handleOpenSetting}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {user?.profilePic == "" ? (
                    <React.Fragment>
                      <div className="flex w-8 h-8 bg-gray-200 text-black rounded-full overflow-hidden items-center justify-center">
                        <div className="flex">
                          <img
                            className="object-cover rounded-full h-8 w-8"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                          ></img>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="flex">
                        <img
                          className="object-cover rounded-full h-8 w-8"
                          src={user?.profilePic}
                        ></img>
                      </div>
                    </React.Fragment>
                  )}
                </button>
              </div>

              {openSetting && (
                <React.Fragment>
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
