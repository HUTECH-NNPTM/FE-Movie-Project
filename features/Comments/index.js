import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
const { io } = require("socket.io-client");
import movieApi from "../../axios/movieApi";
import {
  PaperAirplaneIcon,
  EmojiHappyIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/solid";
import { Picker } from "emoji-mart";

function Comments({ movieId }) {
  const user = useSelector((state) => state.user.info);
  const socket = useRef();
  const commentRef = useRef();

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [openScrollToBottom, setOpenScrollToBottom] = useState(false);
  const [openNewComment, setOpenNewComment] = useState(false);

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET}`);
    getAllComment();
    return () => {
      handleLeaveRoom();
    };
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
      handleScroll();
    });
  }, []);

  const scrollToBottom = () => {
    commentRef.current.scroll({
      top: commentRef.current.scrollHeight,
      behavior: "smooth",
    });
    setOpenScrollToBottom(false);
    setOpenNewComment(false);
  };

  const handleScroll = () => {
    const scrollHeight = commentRef.current.scrollHeight;
    const clientHeight = commentRef.current.clientHeight;
    const scrollTop = commentRef.current.scrollTop;

    /**
     * scrollHeigth - 72 == scrollHeigth before re-render
     * scrollHeigth is scrollHeigth after re-render
     * scrollIsBottomBefore = clientHeight + scrollTop before the re-render
     */

    let scrollHeigthBefore = scrollHeight - 72;
    let scrollIsBottomBefore = clientHeight + scrollTop;

    if (scrollHeigthBefore == scrollIsBottomBefore) {
      setOpenScrollToBottom(false);
      setOpenNewComment(false);
      commentRef.current.scroll({
        top: commentRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      setOpenNewComment(true);
      setOpenScrollToBottom(true);
    }
  };

  const handleEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  const getAllComment = async () => {
    const response = await movieApi.getMovieItem(movieId);
    setComments(response.comments);
    scrollToBottom();
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

  const addEmoijIcon = (emoji) => {
    setText((text += emoji.native));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {
      id: movieId,
      userId: user?._id,
      message: text,
    };

    setText("");
    setOpenEmoji(false);
    sendComment(params).then((result) => {
      let data = { room: movieId, ...result };
      socket.current.emit("sendComment", data);
    });
  };

  const handleLeaveRoom = () => {
    socket.current.emit("leaveRoom", {
      room: movieId,
      userId: user?._id,
      username: user?.username,
    });
  };

  return (
    <div className="flex-col items-center border-[1px]">
      <div className="flex text-md font-bold p-3">Bình luận</div>
      <hr></hr>
      <div className="flex-col relative">
        {openScrollToBottom && (
          <div
            onClick={scrollToBottom}
            className="absolute bottom-8 right-8 bg-red-500 rounded-md p-1 cursor-pointer"
          >
            <ChevronDoubleDownIcon className="w-6 h-6"></ChevronDoubleDownIcon>
          </div>
        )}

        {openNewComment && (
          <div
            onClick={scrollToBottom}
            className="absolute bottom-8 left-[30%] bg-[#181818] rounded-lg p-2 cursor-pointer"
          >
            Có bình luận mới
          </div>
        )}

        <div
          ref={commentRef}
          className="flex-col h-[405px] overflow-y-scroll flex-4 p-2"
        >
          {comments.length == 0 && <div>Không có bình luận nào</div>}
          {comments?.map((item, index) => {
            return <CommentItem key={index} item={item}></CommentItem>;
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-1 bottom-0 p-2">
          <div className="flex w-full items-center space-x-2">
            <div className="flex items-center flex-1">
              <input
                value={text}
                required
                name="message"
                onChange={handleChange}
                className="appearance-none flex-1 p-4 bg-transparent text-gray-200 rounded py-1 px-1 leading-tight outline-none"
                type="text"
                placeholder="Nhập bình luận...."
              />
              <div className="relative">
                <EmojiHappyIcon
                  onClick={handleEmoji}
                  className="w-6 h-6 cursor-pointer"
                ></EmojiHappyIcon>
                {openEmoji && (
                  <Picker
                    onSelect={addEmoijIcon}
                    style={{
                      zIndex: 10000,
                      position: "absolute",
                      top: -450,
                      left: -300,
                    }}
                  ></Picker>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="relative items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <PaperAirplaneIcon className="w-6 h-6"></PaperAirplaneIcon>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Comments;
