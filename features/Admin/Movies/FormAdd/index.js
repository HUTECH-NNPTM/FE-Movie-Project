import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createMovie } from "../../../../slice/movieSlice";

function AddMovie({ handleCloseForm }) {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseForm();
    dispatch(createMovie(movie));
  };

  const uploadVideo = (items) => {
    items.forEach((item) => {
      setLoading(true);
      const storageRef = ref(storage, `/items/${item.file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            toast.success("upload video success!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          // console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
            setLoading(false);
          });
        }
      );
    });
  };

  const handleUploadVideo = (e) => {
    if (!img || !trailer || !video) {
      return toast.error("File is not null", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      e.preventDefault();
      uploadVideo([
        { file: img, label: "img" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);
    }
  };

  return (
    <div className="fixed max-h-[500px] rounded-md bg-white shadow center-item top-[52%] border-[1px]overflow-y-auto h-[500px] w-[750px] z-10 scrollbar-thin scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 ">
      {/* CLOSE BUTTON */}
      <form className="relative p-12" onSubmit={handleSubmit}>
        <div
          className="fixed top-2 right-4 cursor-pointer"
          onClick={handleCloseForm}
        >
          <XCircleIcon className="w-10 h-10 text-gray-500"></XCircleIcon>
        </div>
        <div className="flex text-md font-bold mb-5">Add New Movie</div>
        {/* TITLE */}
        <div className="relative z-0 mb-6 w-full group">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Title
          </label>
        </div>
        {/* DESCRIPTION */}
        <div className="relative z-0 mb-6 w-full group">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Description
          </label>
          <textarea
            required
            onChange={handleChange}
            name="desc"
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description...."
          ></textarea>
        </div>
        {/* YEAR AND GENRE */}
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              type="number"
              name="year"
              id="year"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Year
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              type="text"
              name="genre"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Genre
            </label>
          </div>
        </div>
        {/* LIMIT AND IS SERIES */}
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              onChange={handleChange}
              type="number"
              name="limit"
              id="limit"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Limit
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Is Series
            </label>
            <select
              required
              onChange={handleChange}
              name="isSeries"
              id="isSeries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Select value...</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        </div>
        {/* FORM UPLOAD */}
        {uploaded === 0 && (
          <React.Fragment>
            {/* IMAGE */}
            <div className="relative z-0 mb-6 w-full group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Image
              </label>
              <input
                onChange={(e) => setImg(e.target.files[0])}
                name="img"
                accept="image/*"
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="img"
                type="file"
              />
            </div>
            {/* TRAILER */}
            <div className="relative z-0 mb-6 w-full group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Trailer
              </label>
              <input
                onChange={(e) => setTrailer(e.target.files[0])}
                accept="video/*"
                name="trailer"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="trailer"
                type="file"
              />
            </div>
            {/* VIDEO */}
            <div className="relative z-0 mb-6 w-full group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Video
              </label>
              <input
                onChange={(e) => setVideo(e.target.files[0])}
                name="video"
                accept="video/*"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="video"
                type="file"
              />
            </div>
            {
              loading ? (
                <React.Fragment>
                  <button
                    disabled
                    type="button"
                    class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      role="status"
                      class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Get link file...
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    onClick={handleUploadVideo}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Upload File
                  </button>
                </React.Fragment>
              )
            }
            {/* URL */}
          </React.Fragment>
        )}

        {uploaded === 3 && (
          <React.Fragment>
            <div className="flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                URL image
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  url
                </span>
                <input
                  disabled
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={movie?.img}
                />
              </div>
            </div>
            <div className="flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                URL Trailer
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  url
                </span>
                <input
                  disabled
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={movie?.trailer}
                />
              </div>
            </div>
            <div className="flex-col mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                URL Video
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  url
                </span>
                <input
                  disabled
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={movie?.video}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </React.Fragment>
        )}
      </form>
    </div>
  );
}

export default AddMovie;
