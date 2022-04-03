import React, { useEffect, useState } from "react";
import userApi from "../../../axios/userApi";
import Moment from "react-moment";

function CommentItem({ item }) {
  const [data, setData] = useState({});

  const getUserComment = async () => {
    if (item.userId) {
      const response = await userApi.getInfoUser(item.userId);
      setData(response);
    }
  };

  useEffect(() => {
    getUserComment();
  }, []);

  return (
    <div className="flex items-center space-x-4 p-3">
      <div className="flex">
        <img
          className="object-cover w-12 h-12 rounded-full"
          src="https://recmiennam.com/wp-content/uploads/2020/09/anh-dep-lam-hinh-nen-1.jpg"
        ></img>
      </div>
      <div className="flex justify-between flex-1">
        <div className="flex-col flex-1 w-[80%]">
          <div className="break-all text-xs font-bold">{data.username}</div>
          <div className="break-all text-xs">{item.message}</div>
        </div>
        <div className="flex-end">
          <Moment fromNow>{item.createdAt}</Moment>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
