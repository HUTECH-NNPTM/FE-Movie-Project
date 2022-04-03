import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
const { io } = require("socket.io-client");
import movieApi from "../../axios/movieApi";

function Comments({ movieId }) {
  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SOCKET}`));
  const user = useSelector((state) => state.user.info);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const getAllComment = async () => {
    const response = await movieApi.getMovieItem(movieId);
    setComments(response.comments);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setText(value);
  };

  const sendComment = (params) => {
    return new Promise((reslove, reject) => {
      try {
        const response = movieApi.addCommentMovie(params);
        reslove(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    let params = {
      id: movieId,
      userId: user?._id,
      message: text,
    };
    sendComment(params).then((result) => {
      let data = { room: movieId, ...result };
      socket.current.emit("sendComment", data);
    });
  };

  useEffect(() => {
    getAllComment();
  }, []);

  useEffect(() => {
    if (user && movieId) {
      socket.current.emit("addRoom", {
        room: movieId,
        userId: user?._id,
        username: user?.username,
      });
    }
  }, [user, movieId]);

  useEffect(() => {
    socket.current.on("newUserJoinRoom", (data) => {
      console.log("connected");
    });

    socket.current.on("receiveComment", (data) => {
      let { room, ...info } = data;
      setComments((prev) => [...prev, info]);
    });
  }, [socket]);

  return (
    <div className="flex-col items-center border-[1px]">
      <div className="flex text-md font-bold p-3">Bình luận</div>
      <hr></hr>
      <div className="flex-col h-[430px] overflow-y-auto scrollbar-thin flex-4 p-2">
        {comments.length == 0 && <div>Không có bình luận nào</div>}
        {comments?.map((item, index) => {
          return <CommentItem key={index} item={item}></CommentItem>;
        })}
      </div>
      <form>
        <div className="flex-1 bottom-0 p-2">
          <div className="flex w-full items-center space-x-2">
            <input
              value={text}
              name="message"
              onChange={handleChange}
              className="appearance-none flex-1 bg-transparent text-gray-700 border border-gray-500 rounded py-1 px-1 leading-tight focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="Nhập bình luận...."
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                send
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Comments;
