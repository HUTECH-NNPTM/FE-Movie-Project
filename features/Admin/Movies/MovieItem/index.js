import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../../../slice/movieSlice";

function MovieItem({ item }) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeMovie(id));
    setOpenModal(!openModal)
  };

  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">
          <img className="object-contain" src={item.img} width={150} />
        </div>
      </td>
      <td className="p-2 break-all">
        <div className="text-left">{item.title}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{item.genre}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-green-500">{item.year}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">{item.limit}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">{item.isSeries.toString()}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Edit
            </span>
          </button>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Delete
            </span>
          </button>

          {openModal && (
            <React.Fragment>
              <div
                id="popup-modal"
                tabIndex={-1}
                className="overflow-y-auto overflow-x-hidden fixed z-50 center-item h-modal md:h-full justify-center items-center"
                aria-hidden="true"
              >
                <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full">
                    <div className="flex justify-end p-2">
                      <button
                        onClick={() => setOpenModal(!openModal)}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="popup-modal"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 pt-0 text-center">
                      <h3 className="mb-5 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete ??
                      </h3>
                      <h3 className="mb-5 text-xs font-normal text-gray-500 dark:text-gray-400">
                        {item._id}
                      </h3>

                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={() => setOpenModal(!openModal)}
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </td>
    </tr>
  );
}

export default MovieItem;
