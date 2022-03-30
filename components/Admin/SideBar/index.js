import React from "react";
import Link from "next/link";

function SideBarAdmin() {
  return (
    <div className="w-[350px] h-screen bg-gray-900 ">
      <div className="overflow-y-auto h-full py-4 px-3 dark:bg-gray-800">
        <ul className="space-y-2">
          {/* DASHBOARD */}
          <Link href={"/admin/dashboard"}>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-blue-400 hover:text-black dark:hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3 text-white font-normal ">Dashboard</span>
              </a>
            </li>
          </Link>

          {/* MOVIES */}
          <Link href={"/admin/movies"}>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700"
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="flex-1 text-white ml-3 whitespace-nowrap">
                  Movies
                </span>
              </a>
            </li>
          </Link>

          {/* LISTS */}
          <Link href={"/admin/series"}>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700"
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap !text-white">
                  Series
                </span>
              </a>
            </li>
          </Link>

          {/* USER */}
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap !text-white">
                Users
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarAdmin;
